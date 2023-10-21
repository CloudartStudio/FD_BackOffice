// helpers/database.js
const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456sa",
    server: "localhost",
    database: "FirstData",
    options: {
        encrypt: false,
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((error) => console.log("Database Connection Failed!", error));

module.exports = {
    sql,
    poolPromise,
};
