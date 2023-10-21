import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class DynamicSections extends DynamicBase {
    constructor(NomeSezione, VerticalOrder, Tipo) {
        super("Sections");

        this.NomeSezione = NomeSezione;
        this.VerticalOrder = VerticalOrder;
        this.Tipo = Tipo;

        this.RelatedConfigData = [];
        this.MinRole = 0;
        this.IsConfigured = false;
        this.IsActive = false;
        this.CreationDate = Date.now;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Sections");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Sections");
    }
}

export default DynamicSections;
