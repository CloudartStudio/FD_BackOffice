import PG_databaseFactoryAsync from "../../../helpers/pgConnect";

class SqlBase {
    constructor(tableName) {
        if (new.target === SqlBase) {
            throw new TypeError("Non puoi istanziare direttamente questa classe");
        }

        this.tableName = tableName;
    }

    static async Base_fetchAll(tableName) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");

            const result = await pool.query(`SELECT * FROM "${tableName}"`);
            pool.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async Base_fetchOne(id, tableName) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            const result = await pool.query(`SELECT * FROM "${tableName}" WHERE "ID" = ${id}`);
            pool.release();
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async Base_fetchOneByField(fieldName, fieldValue, tableName) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            if (typeof fieldValue === "string") fieldValue = "'" + fieldValue + "'";
            const result = await pool.query(`SELECT * FROM "${tableName}" WHERE "${fieldName}" = ${fieldValue} LIMIT 1`);
            pool.release();
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async Base_fetchAllByField(fieldName, fieldValue, tableName) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            if (typeof fieldValue === "string") fieldValue = "'" + fieldValue + "'";
            const result = await pool.query(`SELECT * FROM "${tableName}" WHERE "${fieldName}" = ${fieldValue}`);
            pool.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            const result = await pool.query(`DELETE FROM "${this.tableName}" WHERE "ID" = ${id}`);
            pool.release();
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            let updateString = "";
            for (const key in [...this]) {
                if (key !== "tableName" && key !== "ID") updateString += `${key} = ${this[key]}, `;
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space

            const result = await pool.query(`UPDATE "${this.tableName}" SET ${updateString} WHERE "ID" = ${id}`);
            pool.release();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async insertOne() {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            let updateString = "";
            let keyString = "";

            const properties = Object.keys(this);
            for (const key of properties) {
                if (key !== "tableName" && key !== "ID") {
                    keyString += `"${key}", `;
                    switch (typeof this[key]) {
                        case "string":
                            updateString += `'${this[key]}', `;
                            break;
                        default:
                            updateString += `${this[key]}, `;
                            break;
                    }
                }
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space
            keyString = keyString.slice(0, -2); // Remove the trailing comma and space

            const q = `INSERT INTO "${this.tableName}" (${keyString}) VALUES (${updateString} )`;
            const result = await pool.query(q);
            pool.release();
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeQuery(query) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            const result = await pool.query(query);
            pool.release();
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeStoredProcedure(name, params) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            const result = await pool.execute(name, params);
            pool.release();
        } catch (error) {
            throw error;
        }
    }

    static async Base_executeFunction(name, params) {
        try {
            const pool = await PG_databaseFactoryAsync();
            if (pool === undefined) throw new Error("pool is undefined");
            const result = await pool.query(`SELECT ${name}(${params})`);
            pool.release();
        } catch (error) {
            throw error;
        }
    }
}

export default SqlBase;
