import DynamicSections from "../../../models/nosql_model/DynamicSections";

const getReq = async (req, res) => {
    const { id } = req.query;
    let result = await DynamicSections.GetOne(id);
    console.log("RESULT", result);
    res.status(200).json(result);
};

//DynamicPage

export default async (req, res) => {
    try {
        if (req.method === "GET") {
            console.log("FACCIO LA GET");
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
