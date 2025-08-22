import { connection } from "../../db.js";

export async function getPublicBoxes(req, res) {
    try {
        const sql = `
            SELECT boxes.*
            FROM boxes
            INNER JOIN containers
                ON boxes.container_id = containers.id
            WHERE boxes.status_id = (
                SELECT id FROM general_status WHERE name = "published"
            ) AND containers.status_id = (
                SELECT id FROM general_status WHERE name = "published"
            );`;
        const [boxes] = await connection.execute(sql);

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