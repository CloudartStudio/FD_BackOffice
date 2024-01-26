// import DynamicPage from "../../../models/nosql_model/DynamicPage";
// import DynamicSections from "../../../models/nosql_model/DynamicSections";
// import FieldVisualizerModel from "../../../models/nosql_model/FieldVisualizerModel";
// import ChartTabModel from "../../../models/nosql_model/ChartTabModel";

// const fetch = async (req, res) => {
//     try {
//         const { Link } = req.query;
//         const PageResult = await DynamicPage.BaseGetByQuery({ Link: Link });

//         if (!PageResult.IsActive) {
//             return res.status(500).send({
//                 message: "La risorsa non è ancora disponibile",
//             });
//         }

//         const FinalPage = {
//             Sections: [],
//             Nome: "Test",
//         };

//         await Promise.all(
//             PageResult.RelatedSections.map(async (Section) => {
//                 const SectionResult = await DynamicSections.GetOne(Section);

//                 if (SectionResult.IsConfigured && SectionResult.IsActive) {
//                     const FinalSection = {
//                         Configs: [],
//                         NomeSezione: SectionResult.NomeSezione,
//                         VerticalOrder: SectionResult.VerticalOrder,
//                         Tipo: SectionResult.Tipo,
//                     };

//                     if (SectionResult.Tipo == 0) {
//                         await Promise.all(
//                             SectionResult.RelatedConfigData.map(async (config) => {
//                                 const configId = config.insertedId;
//                                 const Config = await FieldVisualizerModel.GetOne(configId);

//                                 const CfgToReturn = {
//                                     Label1: Config.Label1,
//                                     Info: Config.Info,
//                                     IconID: Config.IconID,
//                                     ValueInfo: Config.ValueInfo,
//                                     returnName: Config.returnName,
//                                     _id: Config._id,
//                                 };
//                                 FinalSection.Configs = FinalSection.Configs ? [...FinalSection.Configs, CfgToReturn] : [CfgToReturn];
//                             })
//                         );
//                     } else if (SectionResult.Tipo == 1) {
//                         await Promise.all(
//                             SectionResult.RelatedConfigData.map(async (config) => {
//                                 const configId = config.insertedId;
//                                 const Config = await ChartTabModel.GetOne(configId);

//                                 const CfgToReturn = {
//                                     Name: Config.Name,
//                                     HexColor: Config.HexColor,
//                                     Bars: Config.Bars,
//                                     _id: Config._id,
//                                 };
//                                 FinalSection.Configs = FinalSection.Configs ? [...FinalSection.Configs, CfgToReturn] : [CfgToReturn];
//                             })
//                         );
//                     } else if (SekctionResult.Tipo == 2) {
//                     } else if (SectionResult.Tipo == 3) {
//                     }

//                     FinalPage.Sections.push(FinalSection);
//                 }
//             })
//         );

//         return FinalPage;
//     } catch (error) {
//         res.status(500).send({ message: "Errore del server", error: error });
//     }
// };

// const getReq = async (req, res) => {
//     try {
//         const data = await fetch(req, res);
//         if (data) {
//             res.status(200).json(data);
//         } else
//             res.status(404).send({
//                 message: "Nessuna risorsa per l'id richiesto",
//                 error: "",
//             });
//     } catch (err) {}
// };

// export default async (req, res) => {
//     try {
//         if (req.method === "GET") {
//             return getReq(req, res);
//         } else {
//             return res.status(500).send({
//                 message: "Not Allowed",
//                 error: error,
//             });
//         }
//     } catch (error) {
//         return res.status(500).send({ message: "Error fetching data", error: error });
//     }
// };
