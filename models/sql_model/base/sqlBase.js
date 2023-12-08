import { poolPromise } from "../../../helpers/database";

class SqlBase {
    constructor(tableName) {
        if (new.target === SqlBase) {
            throw new TypeError("Non puoi istanziare direttamente questa classe");
        }

        this.tableName = tableName;
    }

    async fetchAll() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`SELECT * FROM ${this.tableName}`);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    async fetchOne(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`SELECT * FROM ${this.tableName} WHERE ID = ${id}`);
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
            for (const key in [...this]) {
                if (key !== "tableName" && key !== "ID") updateString += `${key} = ${this[key]}, `;
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space

            const result = await pool.request().query(`INSERT INTO ${this.tableName} VALUES ${updateString}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async executeQuery(query) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(query);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async executeStoredProcedure(name, params) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().execute(name, params);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async executeFunction(name, params) {
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
