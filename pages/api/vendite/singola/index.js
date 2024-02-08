import T_vendita_singola from "../../../../models/sql_model/T_vendita_singola";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

//estraggo id patner da token
const postReq = async (req, res) => {
    try {
        const { ID_partner, ID_cliente, data_vendita, prezzo, note, is_b2b } = req.body;

        const new_T_vendita_singola = new T_vendita_singola(ID_partner, ID_cliente, data_vendita, prezzo, note, is_b2b);

        const returnObj = await new_T_vendita_singola.insertOne();
        return res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).send({ message: "Error creating new T_vendita_singola", error: error });
    }
};

//filtro per ID_partner
const getReq = async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);
        const result = await T_vendita_singola.fetchAll();
        result = result.map((el) => {
            if (el.ID_partner == session.user.email.ID_partner) {
                return el;
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_vendita_singola data", error: error });
    }
};

//blocco se non loggato
export default async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Non autorizzato" });
        } else {
            if (session.user.email.ID_ruolo == 3) {
                return res.status(401).json({ message: "Non autorizzato" });
            }
        }

        if (req.method === "POST") {
            await postReq(req, res);
        } else if (req.method === "GET") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
};
