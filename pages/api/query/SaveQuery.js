import Configuration from "../../../models/nosql_model/Configuration";

const postReq = async (req, res) => {
    const { QueryStructureContainer, configID } = req.body;

    //const conf = new Configuration(d, s.Type);
    const conf = await Configuration.GetOne(configID);
    conf.Data = {
        ...conf.Data,
        metadata: QueryStructureContainer,
    };
    const newConf = new Configuration(conf.Data, conf.Type);
    newConf.setActive();
    const result = await newConf.Update(configID);

    res.status(201).json(result);
};

//DynamicPage

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            postReq(req, res);
            return;
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
