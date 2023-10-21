import { poolPromise, sql } from "../../helpers/database";

export default async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                "SELECT * FROM NavMenuStruct where id <> 0 and OverLevel = 0"
            );

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data" });
    }
};
