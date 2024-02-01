import Configuration from "../../../models/nosql_model/Configuration";
import DynamicPage from "../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../models/nosql_model/DynamicSections";
import Configuration from "../../../models/nosql_model/Configuration";
import CachedPage from "../../../models/nosql_model/CachedPage";

//Configuration.GetOne(ID)
//

const postReq = async (req, res) => {
    const { PageID, QueryModelContainer: model, metadata, configID } = req.body;

    const conf = await Configuration.GetOne(configID);
    conf.Data = {
        ...conf.Data,
        metadata: metadata,
        structure: model,
    };
    const newConf = new Configuration(conf.Data, conf.Type);
    newConf.setActive();
    const result = await newConf.Update(configID);

    const page = await DynamicPage.GetOne(id);
    const { Nome: PageName, Link, RelatedSections: SectionsIDs, IsActive, MinRole } = page;
    let sections = []; // -> pageSections
    for (const sectionID of SectionsIDs) {
        const section = DynamicSections.GetOne(sectionID);
        const { collectionName, Data, IsActive, VerticalOrder } = section;

        const configurations = [];
        Data.map((element) => {
            element.IsActive = true;
            if (element.ConfigurationID) {
                var Config = Configuration.GetOne(element.ConfigurationID);
                configurations.push(Config.Data);
            }
        });

        sections.push({ collectionName: collectionName, IsActive: IsActive, VerticalOrder: VerticalOrder, Configurations: configurations, _id: _id });
    }

    const old_cached_page = await CachedPage.GetOne(PageID);
    const new_cached_page = new CachedPage(PageName, Link, MinRole, sections, PageID);
    await new_cached_page.Update(old_cached_page._id);

    res.status(201).json(result);
};

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            postReq(req, res);
            return;
        } else {
            res.status(500).send({
                message: "Not Allowed",
                error: error,
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};
