import PG_databaseFactoryAsync from "../../../helpers/pgConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const getReq = async (req, res) => {
    try {
        const { metadata: QueryStructureContainer } = req.body;

        const resultContainer = [];

        await Promise.all(
            QueryStructureContainer.map(async (QueryStructure) => {
                //QueryStructure
                //#region  select
                let SelectQueryBlock = "SELECT ";
                QueryStructure.select.map((el) => {
                    let alias = "T";
                    if (el.includes("ID_cliente")) {
                        alias = "C";
                        el =
                            'CASE WHEN "C"."ragione_sociale" IS NULL THEN CONCAT("C"."nome", \' \', "C"."cognome") ELSE "C"."ragione_sociale" END  as "ID_cliente","T"."prezzo"';
                    } else if (el.includes("ID_partner")) {
                        alias = "P";
                        el.replace("ID_partner", "ID");
                    } else if (el.includes("(") && el.includes(")")) {
                        const OpenParenthesisIndex = el.indexOf("(");
                        const CloseParenthesisIndex = el.indexOf(")");

                        if (OpenParenthesisIndex !== -1 && CloseParenthesisIndex !== -1) {
                            // Estrai il testo tra le parentesi tonde
                            const testoTraParentesi = el.slice(OpenParenthesisIndex + 1, CloseParenthesisIndex);

                            // Avvolgi il testo tra doppi apici
                            const testoConDoppiApici = '"' + alias + '".' + '"' + testoTraParentesi + '"';

                            // Sostituisci il testo tra parentesi nella stringa originale con quello tra doppi apici
                            el = el.slice(0, OpenParenthesisIndex + 1) + testoConDoppiApici + el.slice(CloseParenthesisIndex);
                        }
                    } else {
                        el = '"' + alias + '".' + '"' + el + '"';
                    }
                    SelectQueryBlock = SelectQueryBlock.concat(el + ",");
                });
                SelectQueryBlock = SelectQueryBlock.slice(0, -1); //rimuovo ultima virgola
                //#endregion

                //#region from
                const FromQueryBlock = " FROM " + '"' + QueryStructure.from + '" as "T" ';
                //#endregion

                //#region join
                let JoinQueryBlock = "";
                if (SelectQueryBlock.includes('CONCAT("C"."nome", \' \', "C"."cognome")')) {
                    JoinQueryBlock = 'inner join "T_clienti" as "C" on "T"."ID_cliente" = "C"."ID" ';
                }
                if (SelectQueryBlock.includes("ID_partner")) {
                    JoinQueryBlock = 'inner join "T_partner" as "P" on "T"."ID_partner" = "P"."ID" ';
                    SelectQueryBlock.replace("ID_partner", "ID");
                }
                //#endregion

                //#region group
                let GroupByQueryBlock = "";
                if (QueryStructure.group && QueryStructure.group.length > 0) {
                    GroupByQueryBlock = " Group By ";
                    QueryStructure.group.map((el) => {
                        GroupByQueryBlock = GroupByQueryBlock.concat('"T"."' + el + '"' + ",");
                    });
                    GroupByQueryBlock = GroupByQueryBlock.slice(0, -1); //rimuovo ultima virgola
                }

                //#region having
                let HavingQueryBlock = "";
                if (QueryStructure.having && QueryStructure.having.length > 0) {
                    HavingQueryBlock = " Having ";
                    QueryStructure.having.map((el) => {
                        if (el.type == 0) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " = " + el.value + " AND ");
                        } else if (el.type == 1) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " <> " + el.value + " AND ");
                        } else if (el.type == 2) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " > " + el.value + " AND ");
                        } else if (el.type == 3) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " < " + el.value + " AND ");
                        } else if (el.type == 4) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " >= " + el.value + " AND ");
                        } else if (el.type == 5) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " <= " + el.value + " AND ");
                        } else if (el.type == 6) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " BETWEEN " + el.value + " AND ");
                        } else if (el.type == 7) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " NOT BETWEEN " + el.value + " AND ");
                        } else if (el.type == 8) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " IN " + el.value + " AND ");
                        } else if (el.type == 9) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " NOT IN " + el.value + " AND ");
                        } else if (el.type == 10) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T"."' + el.column + '"' + " LIKE %" + el.value + "% AND ");
                        } else if (el.type == 11) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T".' + el.column + " NOT LIKE %" + el.value + "% AND ");
                        } else if (el.type == 12) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T".' + el.column + " IS NULL " + el.value + " AND ");
                        } else if (el.type == 13) {
                            HavingQueryBlock = HavingQueryBlock.concat('"T".' + el.column + " IS NOT NULL " + el.value + " AND ");
                        }
                    });
                    HavingQueryBlock = HavingQueryBlock.slice(0, -4); //rimuovo ultima AND
                }

                //#endregion
                GroupByQueryBlock = GroupByQueryBlock + " " + HavingQueryBlock;

                //#endregion

                //#region order
                let OrderByQueryBlock = "";

                if (QueryStructure.order && QueryStructure.order.length > 0) {
                    OrderByQueryBlock = " Order By ";
                    QueryStructure.order.map((el) => {
                        OrderByQueryBlock = OrderByQueryBlock.concat('"T"."' + el.column + '" ' + el.direction + ",");
                    });
                    OrderByQueryBlock = OrderByQueryBlock.slice(0, -1); //rimuovo ultima virgola
                }

                //#endregion

                //#region where
                const session = await getServerSession(req, res, authOptions);

                let WhereQueryBlock = "";
                if (session.user.email.ID_ruolo == 3) {
                    if (FromQueryBlock.includes("T_partner")) {
                        WhereQueryBlock = "where " + '"T"."ID" = ' + session.user.email.ID_partner;
                    } else {
                        WhereQueryBlock = "where " + '"T"."ID_partner" = ' + session.user.email.ID_partner;
                    }
                }

                //#endregion

                const query = SelectQueryBlock + FromQueryBlock + " " + JoinQueryBlock + " " + WhereQueryBlock + " " + GroupByQueryBlock + OrderByQueryBlock;
                const pool = await PG_databaseFactoryAsync();

                console.log("query", query);

                const result = await pool.query(query);

                pool.release();

                resultContainer.push(result.rows);
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
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Non autorizzato" });
        }

        if (req.method === "POST") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};
