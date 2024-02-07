import DynamicSections from "../../../models/nosql_model/DynamicSections";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const getReq = async (req, res) => {
    try {
        const { id } = req.query;
        let result = await DynamicSections.GetOne(id);
        return result;
    } catch (error) {
        return error;
    }
};

//DynamicPage

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

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
