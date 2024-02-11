import SqlBase from "./base/sqlBase";

class T_cliente_partener_b2c extends SqlBase {
    constructor(id, ID_partner, nome, cognome, data_nascita, telefono, is_maschio, email, indirizzo, custom_data) {
        super("T_clienti");
        this.ID = id;
        this.ID_partner = ID_partner;
        this.nome = nome;
        this.cognome = cognome;
        this.data_nascita = data_nascita;
        this.telefono = telefono;
        this.is_maschio = is_maschio;
        this.email = email;
        this.indirizzo = indirizzo;
        this.custom_data = custom_data;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_clienti");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_clienti");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_clienti");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_clienti");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_clienti");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_clienti");
    }
}

export default T_cliente_partener_b2c;
