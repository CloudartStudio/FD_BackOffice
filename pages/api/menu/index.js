import DynamicPage from "../../../models/nosql_model/DynamicPage";
import { ObjectId } from "mongodb";

const getReq = async (req, res) => {
    let result = await DynamicPage.FetchAll();
    const MainPage = result.filter((p) => {
        return p.mainPage === null;
    });

    const Menu = MainPage.map((p) => {
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

        return {
            page: p,
            subPages: subPages,
        };
    });
    res.status(200).json(Menu);
};

//DynamicPage

export default async (req, res) => {
    try {
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
