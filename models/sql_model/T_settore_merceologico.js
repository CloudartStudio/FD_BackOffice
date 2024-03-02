import SqlBase from "./base/sqlBase";

class T_settore_merceologico extends SqlBase {
    constructor(id, nome, descrizione) {
        super("T_settore_merceologico");
        this.ID = id;
        this.nome = nome;
        this.descrizione = descrizione;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_settore_merceologico");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_settore_merceologico");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_settore_merceologico");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_settore_merceologico");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_settore_merceologico");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_settore_merceologico");
    }
}

module.exports = T_settore_merceologico;
