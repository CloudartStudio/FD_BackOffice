import SqlBase from "../sql_model/base/sqlBase";

class T_tabelle_query_editor extends SqlBase {
    constructor(ID, nome_tabella, ruolo_minimo, descrizione) {
        super("T_tabelle_query_editor");
        this.ID = ID;
        this.nome_tabella = nome_tabella;
        this.ruolo_minimo = ruolo_minimo;
        this.descrizione = descrizione;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_tabelle_query_editor");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_tabelle_query_editor");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_tabelle_query_editor");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_tabelle_query_editor");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_tabelle_query_editor");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_tabelle_query_editor");
    }
}

module.exports = T_tabelle_query_editor;
