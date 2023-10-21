import { getDB } from "../../../helpers/mongoDBConnect";
import DynamicBase from "../../../models/nosql_model/base/DynamicBase";

class ConfigBase extends DynamicBase {
    constructor() {
        super("Configurations");
    }

    static async BaseFetchAll() {
        return super._BaseFetchAll("Configurations");
    }

    static async BaseGetOne(id) {
        return super._BaseGetOne(id, "Configurations");
    }
}

export default ConfigBase;
