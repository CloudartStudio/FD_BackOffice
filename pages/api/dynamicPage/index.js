import DynamicPage from "../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../models/nosql_model/DynamicSections";
import Configuration from "../../../models/nosql_model/Configuration";
import { ObjectId } from "mongodb";

const postReq = async (req, res) => {
    const newSections = [];

    console.log("Pagina e sezioni", req.body.Page);
    if (req.body.Page.Sections) {
        for (var s of req.body.Page.Sections) {
            await Promise.all(
                s.data.map(async (d) => {
                    const conf = new Configuration(d, s.Type);
                    const res = await conf.save();
                    d.ConfigurationID = res.insertedId;
                })
            );

            const dynSectionRequest = new DynamicSections(s.data, s.VerticalOrder);

            const dynSection = await dynSectionRequest.save();

            newSections.push(dynSection.insertedId);
        }
    }

    const dynPageRequest = new DynamicPage(req.body.Page.PageName, req.body.Page.Link, req.body.Page.MinRole, newSections, req.body.Page.IsAgenzia);

    const dynPage = await dynPageRequest.save();

    const returnObj = {
        page: dynPage,
        newSections: newSections,
    };

    res.status(201).json(returnObj);
};

const putReq = async (req, res) => {
    const EditedSections = [];
    console.log("Pagina e sezioni", req.body.Page);
    if (req.body.Page.Sections) {
        for (var s of req.body.Page.Sections) {
            if (s.data.find((d) => !d.IsSaved)) {
                const dynSectionRequest = new DynamicSections(s.data, s.VerticalOrder);
                if (s.data.find((d) => d.IsSaved === true)) {
                    // se entra qui allora la sezione è stata modificata
                    const dynSection = await dynSectionRequest.Update(s._id);
                    EditedSections.push(s._id);
                } else {
                    //se entra qui allora la sezione è stata aggiunta in modifica
                    const dynSection = await dynSectionRequest.save();
                    EditedSections.push(dynSection.insertedId);
                }
            } else {
                //se entra qui allora non è stata modificata, aggiungo l'id per non perderla
                EditedSections.push(new ObjectId(s.ID));
            }
        }
    }

    const PageToUpdate = new DynamicPage(req.body.Page.PageName, req.body.Page.Link, req.body.Page.MinRole, EditedSections, req.body.Page.IsAgenzia);

    const dynPage = await PageToUpdate.Update(req.body.Page.ID);

    const returnObj = {
        page: dynPage,
        EditedSections: [],
    };

    res.status(201).json(returnObj);
};

const getReq = async (req, res) => {
    const result = await DynamicPage.FetchAll();
    res.status(200).json(result);
};

//DynamicPage

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            postReq(req, res);
            return;
        } else if (req.method === "PUT") {
            return putReq(req, res);
        } else if (req.method === "GET") {
            return getReq(req, res);
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
