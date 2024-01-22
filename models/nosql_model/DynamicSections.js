import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class DynamicSections extends DynamicBase {
    constructor(Data, VerticalOrder) {
        super("Sections");

        this.VerticalOrder = VerticalOrder;
        this.IsActive = false;
        this.CreationDate = Date.now;

        this.Data = Data.map((d) => {
            return {
                ...d,
                IsSaved: true,
            };
        });
    }

    static async FetchAll() {
        return super._BaseFetchAll("Sections");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Sections");
    }
}

export default DynamicSections;
