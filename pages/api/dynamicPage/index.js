import DynamicPage from "../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../models/nosql_model/DynamicSections";

const postReq = async (req, res) => {
    const newSections = [];

    if (req.body.PageObj.RelatedSections) {
        for (const s of req.body.PageObj.RelatedSections) {
            const dynSectionRequest = new DynamicSections(
                s.NomeSezione,
                s.VerticalOrder,
                s.Tipo
            );

            const dynSection = await dynSectionRequest.save();

            newSections.push(dynSection.insertedId);
        }
    }

    const dynPageRequest = new DynamicPage(
        req.body.PageObj.Nome,
        req.body.PageObj.Link,
        req.body.PageObj.MinRole,
        newSections
    );

    const dynPage = await dynPageRequest.save();

    const returnObj = {
        page: dynPage,
        newSections: newSections,
    };

    res.status(201).json(returnObj);
};

const putReq = async (req, res) => {
    const dynPageRequest = new DynamicPage(
        req.body.PageObj.Nome,
        req.body.PageObj.Link,
        req.body.PageObj.MinRole,
        req.body.PageObj.RelatedSections
    );

    const dynPage = await dynPageRequest.save();

    const returnObj = {
        page: dynPage,
        newSections: [],
    };

    res.status(201).json(returnObj);
};

const getReq = async (req, res) => {
    console.log("IL FETCH INIZIA###");
    const result = await DynamicPage.FetchAll();
    console.log("RESULT", result);
    res.status(200).json(result);
};

//DynamicPage

export default async (req, res) => {
    try {
        console.log("ENTRO NEL METODO");
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
        console.log("error", error);
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};
