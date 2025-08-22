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

    const { original_url } = req.params;
    const { title, url, status, container, perishable, neto } = req.body;
    let { } = req.body;

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
        const sql = `
            UPDATE boxes
            SET title = ?, url_slug = ?, container_id = ?, status_id = (
                SELECT id FROM general_status WHERE name = ?
            ),  perishable = ?, neto = ?
            WHERE url_slug = ?`;
        const [response] = await connection.execute(sql,
            [title, url, container, status, neto, original_url]);

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