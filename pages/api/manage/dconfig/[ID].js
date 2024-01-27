import Configuration from "../../../../models/nosql_model/Configuration";

const getReq = async (req, res) => {
    const { ID } = req.query;
    const page = await Configuration.GetOne(ID);

    if (page) res.status(200).json(page);
    else
        res.status(404).send({
            message: "Nessuna risorsa per l'id richiesto",
            error: "",
        });
};

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
