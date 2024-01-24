import T_tabelle_query_editor from "../../../models/sql_model/T_tabelle_query_editor";
import PG_databaseFactoryAsync from "../../../helpers/pgConnect";

const getReq = async (req, res) => {
    try {
        const result = await T_tabelle_query_editor.fetchAll();
        const tabellaConColonne = [];

        if (result) {
            const pool = await PG_databaseFactoryAsync();
            const queries = result.map(async (element) => {
                console.log(element.nome_tabella, "NOME TABELLA");
                const q = `SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${element.nome_tabella}';`;
                const QueryRes = await pool.query(q);
                element.colonne = QueryRes.rows.map((el) => {
                    return { COLUMN_NAME: el.column_name, DATA_TYPE: el.data_type };
                });

                console.log(element.colonne, "colonne");

                tabellaConColonne.push(element);
            });

            await Promise.all(queries);
            res.status(200).json(tabellaConColonne);
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_tabelle_query_editor data", error });
    }
};

export default async (req, res) => {
    try {
        if (req.method === "GET") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};
