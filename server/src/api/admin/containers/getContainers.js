import { connection } from "../../../db.js";

export async function getAdminContainers(req, res) {
    try {
        const sql = `
            SELECT containers.*,
            (
                SELECT COUNT(*)
                FROM boxes
                WHERE container_id = containers.id
            ) AS boxesCount,
            (
                SELECT SUM(neto)
                FROM boxes
                WHERE container_id = containers.id
            ) AS boxesNeto,
            general_status.name AS status_name
            FROM containers
            INNER JOIN general_status
                ON containers.status_id = general_status.id;
            `;        
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
