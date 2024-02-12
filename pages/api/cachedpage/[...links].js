import CachedPage from "../../../models/nosql_model/CachedPage";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getReq = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session && page.MinRole >= session.user.email.ID_ruolo) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

    const links = req.query.links;
    let page = null;
    if (links.length === 1) {
        page = await CachedPage.BaseGetByQuery({ Link: links[0] });
    } else {
        page = await CachedPage.BaseGetByQuery({ Link: links[0] + "/" + links[1] });
    }

    if (page) res.status(200).json(page);
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
