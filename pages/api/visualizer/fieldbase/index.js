import { info } from "sass";
import FieldVisualizerModel from "../../../../models/nosql_model/FieldVisualizerModel";

const postReq = async (req, res) => {
    try {
        const { Label1, Info, IconID, ValueInfo, ReturnName, Query } =
            req.body.newConfig;

        const dynPageRequest = new FieldVisualizerModel(
            Label1,
            Info,
            IconID,
            ValueInfo,
            Query,
            ReturnName
        );

        const dynPage = await dynPageRequest.save();

        const returnObj = {
            config: dynPage,
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
