import DynamicPage from "../../../models/nosql_model/DynamicPage";
import Role from "../../../models/nosql_model/Role";
import { getSession } from "next-auth/react";

const getReq = async (req, res) => {
    let result = await DynamicPage.FetchAll();
    const MainPage = result.filter((p) => {
        return p.mainPage === null;
    });

    const Menu = [];
    const session = await getSession({ req });
    if (session) {
        MainPage.map((p) => {
            if (session.user.email.ID_ruolo <= p.MinRole) {
                const { id } = p._id;
                const subPages = [];
                result.map((s) => {
                    if (s.mainPage) {
                        try {
                            if (s.mainPage !== null && s.mainPage.id.equals(id)) {
                                subPages.push(s);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });

                console.log(subPages);

                Menu.push({
                    page: p,
                    subPages: subPages,
                });
            }
        });
    }

    res.status(200).json(Menu);
};

export default async (req, res) => {
    try {
        const session = await getSession({ req });

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
