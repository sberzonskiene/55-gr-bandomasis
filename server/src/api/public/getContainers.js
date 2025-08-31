import { connection } from "../../db.js";

export async function getPublicContainers(req, res) {
    try {
        const sql = `
            SELECT *,
            (
                SELECT COUNT(*)
                FROM boxes
                WHERE container_id = containers.id AND status_id = (
                    SELECT id FROM general_status WHERE name = "published"
                )
            ) AS boxesCount
            FROM containers
            WHERE status_id = (
                SELECT id FROM general_status WHERE name = "published"
            );`;
        const [containers] = await connection.execute(sql);

        return res.json({
            status: 'success',
            containers,
        });
    } catch (error) {
        return res.json({
            status: 'error',
            containers: [],
        });
    }
}