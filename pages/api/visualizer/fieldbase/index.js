import FieldVisualizerModel from "../../../../models/nosql_model/FieldVisualizerModel";
import DynamicSections from "../../../../models/nosql_model/DynamicSections";
import { getReq } from "../../dynamicSections/[id]";

const postReq = async (req, res) => {
    try {
        const {
            Label1,
            Info,
            IconID,
            ValueInfo,
            ReturnName,
            Query,
            SectionID,
        } = req.body.newConfig;

        const dynPageRequest = new FieldVisualizerModel(
            Label1,
            Info,
            IconID,
            ValueInfo,
            Query,
            ReturnName
        );

        const dynPage = await dynPageRequest.save();

        req.query.id = SectionID;
        const SectionResult = await getReq(req, res);

        const newSection = new DynamicSections(
            SectionResult.NomeSezione,
            SectionResult.VerticalOrder,
            SectionResult.Tipo
        );

        newSection.CreationDate = Date.now();
        newSection.IsActive = SectionResult.IsActive;
        newSection.IsConfigured = true;
        newSection.MinRole = SectionResult;
        newSection.RelatedConfigData = SectionResult.RelatedConfigData
            ? [...SectionResult.RelatedConfigData, dynPage]
            : [returnObj.config];

        newSection.collectionName = "";

        const updatedSec = await newSection.UpdateWithColl(
            SectionID,
            "Sections"
        );

        const returnObj = {
            config: dynPage,
            section: updatedSec,
        };

        res.status(201).json(returnObj);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};

//DynamicPage

export default async (req, res) => {
    try {
        console.log("ENTRO NEL METODO");
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
        console.log("error", error);
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};
