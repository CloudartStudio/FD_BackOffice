import { poolPromise } from "../../../helpers/database";

class SqlBase {
    constructor(tableName) {
        if (new.target === SqlBase) {
            throw new TypeError("Non puoi istanziare direttamente questa classe");
        }

        this.tableName = tableName;
    }

    static async Base_fetchAll(tableName) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`SELECT * FROM ${tableName}`);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async Base_fetchOne(id, tableName) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`SELECT * FROM ${tableName} WHERE ID = ${id}`);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async Base_fetchOneByField(fieldName, fieldValue, tableName) {
        try {
            const pool = await poolPromise;
            if (typeof fieldValue === "string") fieldValue = "'" + fieldValue + "'";
            const result = await pool.request().query(`SELECT * FROM ${tableName} WHERE ${fieldName} = ${fieldValue}`);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`DELETE FROM ${this.tableName} WHERE ID = ${id}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id) {
        try {
            const pool = await poolPromise;
            let updateString = "";
            for (const key in [...this]) {
                if (key !== "tableName" && key !== "ID") updateString += `${key} = ${this[key]}, `;
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space

            const result = await pool.request().query(`UPDATE ${this.tableName} SET ${updateString} WHERE ID = ${id}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async insertOne() {
        try {
            const pool = await poolPromise;
            let updateString = "";
            let keyString = "";

            const properties = Object.keys(this);
            for (const key of properties) {
                if (key !== "tableName" && key !== "ID") {
                    keyString += `${key}, `;
                    switch (typeof this[key]) {
                        case "string":
                            updateString += `'${this[key]}', `;
                            break;
                        case "boolean":
                            this[key] ? (updateString += `1, `) : (updateString += `0, `);
                            break;
                        default:
                            updateString += `${this[key]}, `;
                            break;
                    }
                }
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space
            keyString = keyString.slice(0, -2); // Remove the trailing comma and space

            const q = `INSERT INTO ${this.tableName} (${keyString}) VALUES (${updateString} )`;
            const result = await pool.request().query(q);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeQuery(query) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(query);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeStoredProcedure(name, params) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().execute(name, params);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeFunction(name, params) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`SELECT ${name}(${params})`);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default SqlBase;
