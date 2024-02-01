import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class Role extends DynamicBase {
    constructor(Ruolo, ID) {
        super("Roles");

        this.roleName = Ruolo;
        this.roleID = ID;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Roles");
    }

    static async BaseGetByQuery(query) {
        return super._BaseGetByQuery(query, "Roles");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Roles");
    }
}

export default Role;
