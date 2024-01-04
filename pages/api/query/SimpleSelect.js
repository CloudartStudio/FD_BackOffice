import { poolPromise, sql } from "../../../helpers/database";

const getReq = async (req, res) => {
    try {
        const { QueryStructureContainer } = req.body;

        const resultContainer = [];

        await Promise.all(
            QueryStructureContainer.map(async (QueryStructure) => {
                //QueryStructure
                //sezione select
                let SelectQueryBlock = "SELECT ";
                QueryStructure.select.map((el) => {
                    SelectQueryBlock = SelectQueryBlock.concat(el + ",");
                });
                SelectQueryBlock = SelectQueryBlock.slice(0, -1); //rimuovo ultima virgola
                //sezione from
                const FromQueryBlock = " FROM " + QueryStructure.from;
                //sezione where
                //sezione order
                //sezione group
                let GroupByQueryBlock = "";
                if (QueryStructure.group && QueryStructure.group.length > 0) {
                    GroupByQueryBlock = " Group By ";
                    QueryStructure.group.map((el) => {
                        GroupByQueryBlock = GroupByQueryBlock.concat(el + ",");
                    });
                    GroupByQueryBlock = GroupByQueryBlock.slice(0, -1); //rimuovo ultima virgola
                }

                //sezione having

                //sezione limit
                //sezione join

                const query = SelectQueryBlock + FromQueryBlock + GroupByQueryBlock;
                const pool = await poolPromise;

                const result = await pool.request().query(query);

                resultContainer.push(result.recordset);
            })
        );

        console.log("resultContainer", resultContainer);

        res.status(200).json(resultContainer);
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_tabelle_query_editor data", error });
    }
};

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};
