import { connection } from "../../../db.js";
import { IsValid } from "../../../lib/IsValid.js";

export async function postAdminContainers(req, res) {
    const [err, msg] = IsValid.fields(req.body, {
        title: 'nonEmptyString',
        url: 'url',
        status: 'nonEmptyString',
        size: 'nonEmptyString',
    });

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { title, url, status, size } = req.body;

    try {
        const sql = `SELECT * FROM containers WHERE title = ? OR url_slug = ?;`;
        const [response] = await connection.execute(sql, [title, url]);

        if (response.length > 0) {
            return res.status(400).json({
                status: 'error',
                msg: 'Toks konteineris jau egzistuoja',
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
            INSERT INTO containers (title, url_slug, status_id, size)
            VALUES (?, ?, 
                (SELECT id FROM general_status WHERE name = ?),
                ?);`;
        const [response] = await connection.execute(sql, [title, url, status, size]);

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
        msg: 'Sekmingai sukurtas konteineris',
    });
}