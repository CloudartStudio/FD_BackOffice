    import T_vendita_singola from "../../../../models/sql_model/T_vendita_singola";

    const postReq = async (req, res) => {
        try {
            const {
                ID_partner, 
                ID_cliente, 
                data_vendita, 
                prezzo, 
                note, 
                is_b2b
            } = req.body;

            const new_T_vendita_singola = new T_vendita_singola(
                ID_partner, 
                ID_cliente, 
                data_vendita, 
                prezzo, 
                note, 
                is_b2b
            );

            const returnObj = await new_T_vendita_singola.insertOne();
            return res.status(201).json(returnObj);
        } catch (error) {
            res.status(500).send({ message: "Error creating new T_vendita_singola", error: error });
        }
    };

    const getReq = async (req, res) => {
        try {
            const result = await T_vendita_singola.fetchAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send({ message: "Error fetching T_vendita_singola data", error: error });
        }
    };

    export default async (req, res) => {
        try {
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