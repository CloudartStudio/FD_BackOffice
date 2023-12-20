//import { poolPromise, sql } from "../../../helpers/database";
// import FieldVisualizerModel from "../../../models/nosql_model/FieldVisualizerModel";

// export default async (req, res) => {
//     try {
//         if (req.method !== "POST") {
//             return res.status(405).end(); // Metodo non consentito se non è POST
//         }

//         // Estrai dati dal body della richiesta
//         const { ConfigID } = req.body;

//         //ESTAGGO LA QUERY CON LE COORDINATE

//         const data = await FieldVisualizerModel.BaseGetOne(ConfigID);

//         const pool = await poolPromise;

//         const result = await pool.request().query(data.Query); //TODO GALATTICO: LASCIARE COSI SAREBBE UNA FALLA NELLA SICUREZZA ASSURDA: PERMETTEREBBE DI FARE INJECTION DI QUERY CON UNA FACILITA ESTREMA.
//         // AGGIUNGERE TOKEN BEARER E SOPRATTUTO UN SISTEMA A COORDINATE PER TROVARE LA QUERY GIUSTA

//         if (result.recordset[0]) res.status(200).json(result.recordset[0]);
//         else res.status(500).send({ message: "No data" });
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching data" });
//     }
// };

import T_tabelle_query_editor from "../../../models/sql_model/T_tabelle_query_editor";
import { poolPromise, sql } from "../../../helpers/database";

const getReq = async (req, res) => {
    try {
        //QueryStructure
        const { QueryStructure } = req.body;

        //sezione select
        let SelectQueryBlock = "SELECT ";
        QueryStructure.select.map((el) => {
            SelectQueryBlock = SelectQueryBlock.concat(el + ",");
        });
        SelectQueryBlock = SelectQueryBlock.slice(0, -1); //rimuovo ultima virgola
        //sezione from
        const FromQueryBlock = " FROM " + QueryStructure.from;
        //sezione where
        //sezione order
        //sezione group
        //sezione having
        //sezione limit
        //sezione join

        const query = SelectQueryBlock + FromQueryBlock;
        const pool = await poolPromise;

        const result = await pool.request().query(query);

        result.recordset.map((el) => {
            console.log(el);
        });

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_tabelle_query_editor data", error });
    }
};

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};
