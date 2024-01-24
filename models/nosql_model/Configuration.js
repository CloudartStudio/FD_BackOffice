import DynamicBase from "./base/DynamicBase";

class Configuration extends DynamicBase {
    constructor(data, type) {
        super("Configurations");
        this.Data = data;
        this.Type = type;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Configurations");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Configurations");
    }
}

export default Configuration;
