import DynamicPage from "../../../../../models/nosql_model/DynamicPage";
import { ObjectId } from "mongodb";

//OTTENGO TUTTE LE SOTTO PAGINE PER L'ID DELLA PAGINA
const getReq = async (req, res) => {
    const links = req.query.links;
    if (links.length === 1) {
        const page = await DynamicPage.BaseGetByQuery({ Link: links[0] });

        if (page) res.status(200).json(page);
        else
            res.status(404).send({
                message: "Nessuna risorsa per l'id richiesto",
                error: "",
            });
    } else {
        const page = await DynamicPage.BaseGetByQuery({ Link: links[0] });
        let result = await DynamicPage.FetchAll();
        result = result.filter((p) => {
            if (p.mainPage) {
                return p.mainPage.id.equals(page._id.id);
            }
        });

        const SubPage = result.filter((p) => {
            return p.Link === links[1];
        });

        if (SubPage) res.status(200).json(SubPage);
        else
            res.status(404).send({
                message: "Nessuna risorsa per l'id richiesto",
                error: "",
            });
    }
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
