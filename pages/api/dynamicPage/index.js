import DynamicPage from "../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../models/nosql_model/DynamicSections";
import { ObjectId } from "mongodb";

const postReq = async (req, res) => {
    const newSections = [];

    if (req.body.PageObj.RelatedSections) {
        for (const s of req.body.PageObj.RelatedSections) {
            const dynSectionRequest = new DynamicSections(s.NomeSezione, s.VerticalOrder, s.Tipo);

            const dynSection = await dynSectionRequest.save();

            newSections.push(dynSection.insertedId);
        }
    }

    const dynPageRequest = new DynamicPage(req.body.PageObj.Nome, req.body.PageObj.Link, req.body.PageObj.MinRole, newSections);

    const dynPage = await dynPageRequest.save();

    const returnObj = {
        page: dynPage,
        newSections: newSections,
    };

    res.status(201).json(returnObj);
};

const putReq = async (req, res) => {
    var RelatedSections = [];
    req.body.PageObj.RelatedSections.map((section) => {
        RelatedSections.push(new ObjectId(section._id));
    });

    const PageToUpdate = new DynamicPage(req.body.PageObj.Nome, req.body.PageObj.Link, req.body.PageObj.MinRole, RelatedSections); // = await DynamicPage.GetOne(req.body.PageObj.ID);

    const dynPage = await PageToUpdate.Update(req.body.PageObj.ID);

    const returnObj = {
        page: dynPage,
        newSections: [],
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
