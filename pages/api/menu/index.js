import DynamicPage from "../../../models/nosql_model/DynamicPage";

const getReq = async (req, res) => {
    let result = await DynamicPage.FetchAll();
    result = result.filter((p) => {
        return p.mainPage === null;
    });
    res.status(200).json(result);
};

//DynamicPage

export default async (req, res) => {
    try {
        if (req.method === "GET") {
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
