import { getDB } from "../../helpers/mongoDBConnect";
import DynamicBase from "../../models/nosql_model/base/DynamicBase";

class DynamicPage extends DynamicBase {
    constructor(Nome, Link, MinRole, RelatedSections, IsAgenzia, mainPage = null) {
        super("Pages");

        this.IsActive = false;
        this.CreationDate = Date.now;
        this.Nome = Nome;
        this.Link = Link;
        this.MinRole = MinRole;
        this.RelatedSections = RelatedSections;
        this.IsAgenzia = IsAgenzia;
        //se è valorizzato allora è una sotto pagina
        this.mainPage = mainPage;
    }

    static async FetchAll() {
        return super._BaseFetchAll("Pages");
    }

    static async GetOne(id) {
        return super._BaseGetOne(id, "Pages");
    }

    static async BaseGetByQuery(query) {
        return super._BaseGetByQuery(query, "Pages");
    }

    static async Delete(id) {
        return super._BaseDelete(id, "Pages");
    }
}

export default DynamicPage;
