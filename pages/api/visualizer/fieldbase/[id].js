import FieldVisualizerModel from "../../../../models/nosql_model/FieldVisualizerModel";

const getReq = async (req, res) => {
    const { id } = req.query;
    let result = await FieldVisualizerModel.GetOne(id);
    console.log("RESULT", result);
    return result;
};

export default async (req, res) => {
    try {
        if (req.method === "GET") {
            const result = await getReq(req, res);
            return res.status(200).json(result);
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
