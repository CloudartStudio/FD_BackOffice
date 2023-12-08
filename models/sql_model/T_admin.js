import SqlBase from "./base/sqlBase";

class T_admin extends SqlBase {
    constructor(id, admin_name, email) {
        super("T_admin");
        this.ID = id;
        this.admin_name = admin_name;
        this.email = email;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_admin");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_admin");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_admin");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_admin");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_admin");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_admin");
    }
}

export default T_admin;
