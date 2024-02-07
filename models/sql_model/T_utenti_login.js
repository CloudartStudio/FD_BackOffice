import SqlBase from "./base/sqlBase";

class T_utenti_login extends SqlBase {
    constructor(ID_utente, ID_ruolo, password) {
        super("T_utenti_login");
        this.ID_utente = ID_utente;
        this.ID_ruolo = ID_ruolo;
        this.password = password;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_utenti_login");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_utenti_login");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_utenti_login");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_utenti_login");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_utenti_login");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_utenti_login");
    }
}

export default T_utenti_login;
