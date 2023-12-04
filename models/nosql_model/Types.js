import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class Types extends DynamicBase {
    constructor(Type, ID) {
        super("Types");

        this.typeName = Type;
        this.typeID = ID;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Types");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Types");
    }
}

export default Types;
