import { connection } from "../../../db.js";

export async function getAdminBoxes(req, res) {
    try {
        const sql = `
            SELECT boxes.*, general_status.name AS status_name
            FROM boxes
            INNER JOIN general_status
                ON boxes.status_id = general_status.id;`;
        const [movies] = await connection.execute(sql);

        return res.json({
            status: 'success',
            boxes,
        });
    } catch (error) {
        return res.json({
            status: 'error',
            boxes: [],
        });
    }
}