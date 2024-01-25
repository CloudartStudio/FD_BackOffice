import DynamicBase from "./base/DynamicBase";

class Configuration extends DynamicBase {
    constructor(data, type) {
        super("Configurations");
        this.Data = { ...data, active: false };
        this.Type = type;
    }

    setActive() {
        this.Data.active = true;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Configurations");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Configurations");
    }
}

export default Configuration;
