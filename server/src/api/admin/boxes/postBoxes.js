import { connection } from "../../../db.js";
import { IsValid } from "../../../lib/IsValid.js";

export async function postAdminBoxes(req, res) {
    const [err, msg] = IsValid.fields(req.body, {
        title: 'nonEmptyString',
        url: 'url',
        container: 'numberInteger',
        neto: 'numberInteger',
        perishable: 'nonEmptyString',
        status: 'nonEmptyString',
    });

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { title, url, status,  container, perishable, neto} = req.body;

    if (container === 0) {
        container = null;
    }
    if (!perishable) {
        perishable = '';
    }
    if (!neto) {
        neto = 0;
    }
    
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
            INSERT INTO movies
                (title, url_slug, container_id, status_id, perishable, neto)
            VALUES (?, ?, ?, ?, ?, ?,
                (SELECT id FROM general_status WHERE name = ?),
                ?, ?, ?, ?, ?, ?);`;
        const [response] = await connection.execute(sql,
            [title, url, status]
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