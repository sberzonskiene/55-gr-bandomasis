import { connection } from "../../../db.js";
import { IsValid } from "../../../lib/IsValid.js";

export async function putAdminBoxes(req, res) {
    const [errParams, msgParams] = IsValid.fields(req.params, {
        original_url: 'nonEmptyString',
    });

    if (errParams) {
        return res.json({
            status: 'error',
            msg: msgParams,
        });
    }

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

    const { original_url } = req.params;
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
        const sql = `
            UPDATE boxes
            SET img = ?, title = ?, url_slug = ?, container_id = ?, neto = ?, type_f_id = (
                SELECT id FROM general_type WHERE name = ?
            ), type_p_id = (
                SELECT id FROM general_type WHERE name = ?
            ), status_id = (
                SELECT id FROM general_status WHERE name = ?
            )
            WHERE url_slug = ?`;

        const [response] = await connection.execute(sql,
            [imgPath, title, url, container, neto, typeF, typeP, status, original_url]);

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

    return res.status(200).json({
        status: 'success',
        msg: 'Sekmingai atnaujinta dėžės informacija',
    });
}