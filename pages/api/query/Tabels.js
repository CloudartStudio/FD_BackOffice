// import T_tabelle_query_editor from "../../../models/sql_model/T_tabelle_query_editor";
// import { poolPromise } from "../../../helpers/database";

// const getReq = async (req, res) => {
//     try {
//         const result = await T_tabelle_query_editor.fetchAll();
//         const tabellaConColonne = [];

//         if (result) {
//             const pool = await poolPromise;
//             await Promise.all(
//                 result.map(async (element) => {
//                     console.log(element.nome_tabella, "NOME TABELLA");
//                     element.colonne = (
//                         await pool.request().query(`SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${element.nome_tabella}';`)
//                     ).recordset.map((el) => {
//                         return { COLUMN_NAME: el.COLUMN_NAME, DATA_TYPE: el.DATA_TYPE };
//                     });

//                     console.log(element.colonne, "colonne");

//                     tabellaConColonne.push(element);
//                 })
//             );
//         }

//         res.status(200).json(tabellaConColonne);
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching T_tabelle_query_editor data", error });
//     }
// };

// export default async (req, res) => {
//     try {
//         if (req.method === "GET") {
//             await getReq(req, res);
//         } else {
//             res.status(405).send({ message: "Method Not Allowed" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error", error });
//     }
// };
