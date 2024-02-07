import DynamicPage from "../../../../../models/nosql_model/DynamicPage";
import DynamicSections from "../../../../../models/nosql_model/DynamicSections";
import Configuration from "../../../../../models/nosql_model/Configuration";
import CachedPage from "../../../../../models/nosql_model/CachedPage";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const postReq = async (req, res) => {
    const newSections = [];

    if (!req.body.Page.MainPageId) return res.status(500).send({ message: "main page is required", error: error });

    const mainPage = await DynamicPage.GetOne(req.body.Page.MainPageId);

    console.log("Pagina e sezioni", req.body.Page);
    if (req.body.Page.Sections) {
        for (var s of req.body.Page.Sections) {
            await Promise.all(
                s.data.map(async (d) => {
                    const conf = new Configuration(d, s.Type);
                    const res = await conf.save();
                    d.ConfigurationID = res.insertedId;
                })
            );

            const dynSectionRequest = new DynamicSections(s.data, s.VerticalOrder);

            const dynSection = await dynSectionRequest.save();

            newSections.push(dynSection.insertedId);
        }
    }

    const Link = mainPage.Link + "/" + req.body.Page.Link;

    const dynPageRequest = new DynamicPage(
        req.body.Page.PageName,
        Link,
        mainPage.MinRole,
        newSections,
        mainPage.IsAgenzia,
        new ObjectId(req.body.Page.MainPageId)
    );

    const dynPage = await dynPageRequest.save();

    const cachePage = new CachedPage(req.body.Page.PageName, Link, req.body.Page.MinRole, [], dynPage.insertedId);
    await cachePage.save();

    const returnObj = {
        page: dynPage,
        newSections: newSections,
    };

    res.status(201).json(returnObj);
};

const putReq = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session && session.user.email.ID_ruolo == 1) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

    const EditedSections = [];
    console.log("Pagina e sezioni", req.body.Page);
    if (req.body.Page.Sections) {
        for (var s of req.body.Page.Sections) {
            if (s.data && s.data.find((d) => !d.IsSaved)) {
                await Promise.all(
                    s.data.map(async (d) => {
                        if (!d.IsSaved) {
                            const conf = new Configuration(d, s.Type);
                            const res = await conf.save();
                            d.ConfigurationID = res.insertedId;
                        }
                    })
                );

                const dynSectionRequest = new DynamicSections(s.data, s.VerticalOrder);
                dynSectionRequest.data = s.data;
                if (s.data.find((d) => d.IsSaved === true)) {
                    // se entra qui allora la sezione è stata modificata
                    await dynSectionRequest.Update(s._id);
                    EditedSections.push(new ObjectId(s._id));
                } else {
                    //se entra qui allora la sezione è stata aggiunta in modifica
                    const dynSection = await dynSectionRequest.save();
                    EditedSections.push(dynSection.insertedId);
                }
            } else {
                //se entra qui allora non è stata modificata, aggiungo l'id per non perderla
                EditedSections.push(new ObjectId(s._id));
            }
        }
    }

    const PageToUpdate = new DynamicPage(
        req.body.Page.PageName,
        req.body.Page.Link,
        mainPage.MinRole,
        newSections,
        mainPage.IsAgenzia,
        new ObjectId(req.body.Page.MainPageId)
    );

    const dynPage = await PageToUpdate.Update(req.body.Page.ID);

    const returnObj = {
        page: dynPage,
        EditedSections: [],
    };

    res.status(201).json(returnObj);
};

//DynamicPage

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session && session.user.email.ID_ruolo != 1) {
        return res.status(401).json({ message: "Non autorizzato" });
    }

    try {
        if (req.method === "POST") {
            postReq(req, res);
            return;
        } else if (req.method === "PUT") {
            return putReq(req, res);
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
