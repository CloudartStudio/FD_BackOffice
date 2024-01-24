import SqlBase from "./base/sqlBase";

class T_vendita_singola extends SqlBase {
    constructor(ID_partner, ID_cliente, data_vendita, prezzo, note, is_b2b) {
        super("T_vendita_singola");
        this.ID_partner = ID_partner;
        this.ID_cliente = ID_cliente;
        this.data_vendita = data_vendita;
        this.prezzo = prezzo;
        this.note = note;
        this.is_b2b = is_b2b;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_vendita_singola");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_vendita_singola");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_vendita_singola");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_vendita_singola");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_vendita_singola");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_vendita_singola");
    }
}

export default T_vendita_singola;
