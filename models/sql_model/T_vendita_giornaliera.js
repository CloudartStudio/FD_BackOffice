import SqlBase from "./base/sqlBase";

class T_vendita_giornaliera extends SqlBase {
    constructor(ID_partner, data, totale_incasso, totale_numero_vendite, note) {
        super("T_vendita_giornaliera");
        this.ID_partner = ID_partner;
        this.data = data;
        this.totale_incasso = totale_incasso;
        this.totale_numero_vendite = totale_numero_vendite;
        this.note = note;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_vendita_giornaliera");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_vendita_giornaliera");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_vendita_giornaliera");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_vendita_giornaliera");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_vendita_giornaliera");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_vendita_giornaliera");
    }
}

export default T_vendita_giornaliera;
