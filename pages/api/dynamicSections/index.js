import DynamicSections from "../../../models/nosql_model/DynamicSections";

export const getReq = async (req, res) => {
    try {
        let result = await DynamicSections.FetchAll();
        return result;
    } catch (error) {
        return error;
    }
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
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};
