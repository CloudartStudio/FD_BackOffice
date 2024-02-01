import { getDB } from "../../helpers/mongoDBConnect";
import DynamicBase from "./base/DynamicBase";

class CachedPage extends DynamicBase {
    constructor(Nome, Link, MinRole, Sections, PageID) {
        super("Pages");

        this.CreationDate = Date.now;
        this.Nome = Nome;
        this.Link = Link;
        this.MinRole = MinRole;
        this.Sections = Sections;
        this.PageID = PageID;
    }

    static async FetchAll() {
        return super._BaseFetchAll("CachedPage");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "CachedPage");
    }

    static async BaseGetByQuery(query) {
        return super._BaseGetByQuery(query, "CachedPage");
    }

    static async Delete(id) {
        return super._BaseDelete(id, "CachedPage");
    }
}

export default CachedPage;
