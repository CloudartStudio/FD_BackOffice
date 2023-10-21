import ConfigBase from "../../models/nosql_model/base/ConfigBase";

class FieldVisualizerModel extends ConfigBase {
    constructor(Label1, Info, IconID, ValueInfo, Query, returnName) {
        super();
        this.Label1 = Label1;
        this.Info = Info;
        this.IconID = IconID;
        this.ValueInfo = ValueInfo;
        this.Query = Query;
        this.returnName = returnName;
    }

    static async FetchAll() {
        return super.BaseFetchAll();
    }

    static async GetOne(id) {
        return super.BaseGetOne(id);
    }
}

export default FieldVisualizerModel;
