import { connection } from "../../../db.js";
import { IsValid } from "../../../lib/IsValid.js";

export async function postAdminBoxes(req, res) {
    const [err, msg] = IsValid.fields(req.body, {
        title: 'nonEmptyString',
        url: 'url',
        neto: 'numberFloat',
        container: 'numberInteger',
        typeF: 'nonEmptyString',
        typeP: 'nonEmptyString',
        status: 'nonEmptyString',   
    },  {
        img: 'nonEmptyString',
    });

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { title, url, neto, container, typeF, typeP, status} = req.body;
    let { img } = req.body;

    if (!neto) {
        neto = 0;
    }
     if (!img) {
        img = '';
    }

    const imgPath = img.split('/').at(-1);
    
    try {
        const sql = `SELECT * FROM boxes WHERE url_slug = ?;`;
        const [response] = await connection.execute(sql, [url]);

        if (response.length > 0) {
            return res.status(400).json({
                status: 'error',
                msg: {
                    url: 'Tokia dėžė jau yra',
                },
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Serverio klaida',
        });
    }

    try {
        const sql = `
            INSERT INTO boxes
                (img, title, url_slug, neto, container_id, type_f_id, type_p_id, status_id)
            VALUES (?, ?, ?, ?, ?, 
                (SELECT id FROM general_type WHERE name = ?),
                (SELECT id FROM general_type WHERE name = ?),
                (SELECT id FROM general_status WHERE name = ?));`;

        const [response] = await connection.execute(sql,
            [imgPath, title, url, neto, container, typeF, typeP, status]
        );

        if (response.affectedRows !== 1) {
            return res.status(500).json({
                status: 'error',
                msg: 'Serverio klaida',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Serverio klaida',
        });
    }

    return res.status(201).json({
        status: 'success',
        msg: 'Sekmingai patalpinta dėžė',
    });
}