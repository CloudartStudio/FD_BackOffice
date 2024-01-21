import { Pool } from "pg";
import readCACertificate from "../certificate/caCertificate";

// const pool = new Pool({
//     user: "doadmin",
//     password: "AVNS_FMeLZXps0uuIhPz1Lh5",
//     host: "db-postgresql-fd-bkd-off-do-user-15637643-0.c.db.ondigitalocean.com",
//     port: 25060,
//     database: "First_Data",
//     ssl: {
//         rejectUnauthorized: false,
//         ca: readCACertificate(),
//     },
// });
//process.env.

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
        ca: readCACertificate(process.env.SSL_CERTIFICATE),
    },
});

const PG_databaseFactoryAsync = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");
        return client;
    } catch (error) {
        console.error("Database Connection Failed!", error);
        throw error; // Rilancia l'errore per gestirlo altrove se necessario
    }
};

export default PG_databaseFactoryAsync;
