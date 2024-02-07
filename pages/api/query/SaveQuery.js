import Configuration from "../../../models/nosql_model/Configuration";
import DynamicPage from "../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../models/nosql_model/DynamicSections";
import CachedPage from "../../../models/nosql_model/CachedPage";
const { ObjectId } = require("mongodb");

//Configuration.GetOne(ID)
//

const postReq = async (req, res) => {
    const { pageID: pageID, QueryModelContainer: model, metadata, configID } = req.body;

    const conf = await Configuration.GetOne(configID);
    conf.Data = {
        ...conf.Data,
        metadata: metadata,
        structure: model,
    };
    const newConf = new Configuration(conf.Data, conf.Type);
    newConf.setActive();
    const result = await newConf.Update(configID);

    const page = await DynamicPage.GetOne(pageID);
    const { Nome: PageName, Link, RelatedSections: SectionsIDs, IsActive, MinRole } = page;
    let sections = []; // -> pageSections
    for (const sectionID of SectionsIDs) {
        const test = sectionID.toString();
        const section = await DynamicSections.GetOne(sectionID.toString());
        const { collectionName, Data, IsActive, VerticalOrder, _id } = section;

        const configurations = [];
        Data.map(async (element) => {
            element.IsActive = true;
            if (element.ConfigurationID) {
                var Config = await Configuration.GetOne(element.ConfigurationID.toString());
                configurations.push(Config.Data);
            }
        });

        sections.push({ collectionName: collectionName, IsActive: IsActive, VerticalOrder: VerticalOrder, Configurations: configurations, _id: _id });
    }

    const old_cached_page = await CachedPage.BaseGetByQuery({ PageID: new ObjectId(pageID) });
    const new_cached_page = new CachedPage(PageName, Link, MinRole, sections, new ObjectId(pageID));
    console.log("old_cached_page._id.toString()", old_cached_page._id.toString());
    await new_cached_page.Update(old_cached_page._id.toString());

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
