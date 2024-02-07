import DynamicPage from "../../../../models/nosql_model/DynamicPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getReq = async (req, res) => {
    const { id } = req.query;
    const result = await DynamicPage.GetOne(id);
    const session = await getServerSession(req, res, authOptions);

    if (!session && result.MinRole >= session.user.email.ID_ruolo) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

    if (result) res.status(200).json(result);
    else
        res.status(404).send({
            message: "Nessuna risorsa per l'id richiesto",
            error: "",
        });
};

const deleteReq = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session && result.MinRole == 1) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

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
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Non autorizzato" });
        }

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
