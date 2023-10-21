import { poolPromise, sql } from "../../../helpers/database";
import { getDB } from "../../../helpers/mongoDBConnect";

export default async (req, res) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).end(); // Metodo non consentito se non è POST
        }

        // Estrai dati dal body della richiesta
        const { ConfigID, Link, SectionID } = req.body;

        console.log("################ API CONSOLE");
        console.log(ConfigID, Link, SectionID);

        //ESTAGGO LA QUERY CON LE COORDINATE

        const db = await getDB();
        console.log("GET DB");
        const data = await db
            .collection("Configurations")
            .find({ "Pages.Link": "testgraph" })
            .toArray();

        const { Pages } = data[0];

        const Page = Pages.find((p) => p.Link == "testgraph");

        const Section = Page.Sections.find((s) => s.ID == SectionID);

        const Config = Section.ConfigData.find((c) => c.ConfigID == ConfigID);

        const pool = await poolPromise;

        const result = await pool.request().query(Config.Query); //TODO GALATTICO: LASCIARE COSI SAREBBE UNA FALLA NELLA SICUREZZA ASSURDA: PERMETTEREBBE DI FARE INJECTION DI QUERY CON UNA FACILITA ESTREMA.
        // AGGIUNGERE TOKEN BEARER E SOPRATTUTO UN SISTEMA A COORDINATE PER TROVARE LA QUERY GIUSTA

        if (result.recordset[0]) res.status(200).json(result.recordset[0]);
        else res.status(500).send({ message: "No data" });
    } catch (error) {
        res.status(500).send({ message: "Error fetching data" });
    }
};
