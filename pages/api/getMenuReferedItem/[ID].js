import { poolPromise, sql } from "../../../helpers/database";

export default async (req, res) => {
    try {
        const { ID } = req.query;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(`SELECT * FROM NavMenuStruct where OverLevel = ${ID}`);

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).send({ message: "Error fetching data" });
    }
};
