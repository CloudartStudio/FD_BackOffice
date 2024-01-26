import DynamicPage from "../../../../../models/nosql_model/DynamicPage";
import { ObjectId } from "mongodb";

//OTTENGO TUTTE LE SOTTO PAGINE PER L'ID DELLA PAGINA
const getReq = async (req, res) => {
    const { id } = req.query;
    const objectId = new ObjectId(id);
    let result = await DynamicPage.FetchAll();
    result = result.filter((p) => {
        if (p.mainPage) {
            return p.mainPage.id.equals(objectId.id);
        }
    });

    if (result) res.status(200).json(result);
    else
        res.status(404).send({
            message: "Nessuna risorsa per l'id richiesto",
            error: "",
        });
};

const deleteReq = async (req, res) => {
    const { id } = req.query;
    const result = await DynamicPage.Delete(id);
    if (result) res.status(200).json(result);
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
        } else if (req.method === "DELETE") {
            return deleteReq(req, res);
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
