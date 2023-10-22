import ConfigBase from "./base/ConfigBase";

class ChartTabModel extends ConfigBase {
    constructor(Name, HexColor, Bars, ReturnName) {
        super("Configurations");
        this.Name = Name;
        this.HexColor = HexColor;
        this.Bars = Bars;
    }

    static async FetchAll() {
        return super.BaseFetchAll();
    }

    static async GetOne(id) {
        return super.BaseGetOne(id);
    }
}

export default ChartTabModel;
