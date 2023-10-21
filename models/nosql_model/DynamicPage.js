import { getDB } from "../../helpers/mongoDBConnect";
import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class DynamicPage extends DynamicBase {
    constructor(Nome, Link, MinRole, RelatedSections) {
        super("Pages");

        this.IsActive = false;
        this.CreationDate = Date.now;
        this.Nome = Nome;
        this.Link = Link;
        this.MinRole = MinRole;
        this.RelatedSections = RelatedSections;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Pages");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Pages");
    }
}

export default DynamicPage;
