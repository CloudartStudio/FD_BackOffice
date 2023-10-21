import { getDB } from "../../../helpers/mongoDBConnect";

export default async (req, res) => {
    try {
        const { Link } = req.query;

        const db = await getDB();
        console.log("##### LINK : ", req.query);
        if (db) {
            const data = await db
                .collection("Configurations")
                .find({ "Pages.Link": Link })
                .toArray();

            const { Pages } = data[0];

            res.status(200).json(Pages.find((p) => p.Link == "testgraph"));
        } else {
            res.status(500).send({
                message:
                    "Can't access to DB instansce, check the connection or the connect module",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({ message: "Error fetching data", error: error });
    }
};
