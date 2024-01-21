// import { poolPromise, sql } from "../../../helpers/database";
// import FieldVisualizerModel from "../../../models/nosql_model/FieldVisualizerModel";

// export default async (req, res) => {
//     try {
//         if (req.method !== "POST") {
//             return res.status(405).end(); // Metodo non consentito se non è POST
//         }

//         // Estrai dati dal body della richiesta
//         const { ConfigID, GraphID } = req.body;

//         //ESTAGGO LA QUERY CON LE COORDINATE

//         const data = await FieldVisualizerModel.BaseGetOne(ConfigID);

//         const bar = data.Bars[GraphID];

//         const pool = await poolPromise;

//         const result = await pool.request().query(bar.Query); //TODO GALATTICO: AGGIUNGERE TOKEN BEARER

//         if (result.recordset[0]) res.status(200).json(result.recordset[0]);
//         else res.status(500).send({ message: "No data" });
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching data" });
//     }
// };
