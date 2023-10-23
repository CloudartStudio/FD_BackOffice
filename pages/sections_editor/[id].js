import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Head from "next/head";
import NewFieldVisualizerModal from "../../components/modal/NewFieldVisualizerModal";
import NewChartTab from "../../components/modal/NewChartTab";

const SectionsEditor = () => {
    const [Configs, SetConfigs] = useState(null);
    const [typeOfSection, setTypeOfSection] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalChart, SetOpenModalChart] = useState(false);
    const [nomeSezione, setNomeSezione] = useState("");
    const [tipo, setTipo] = useState("");
    const [verticalOrder, setVerticalOrder] = useState("");
    const [minRole, setMinRole] = useState("");

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(id);
                const sectionsConfigResponse = await fetch(
                    "http://localhost:3000/api/dynamicSections/" + id
                );

                const data = await sectionsConfigResponse.json();

                data.RelatedConfigData.map(async (configID) => {
                    console.log("configID", configID.insertedId);
                    const ConfigData = await fetch(
                        "http://localhost:3000/api/visualizer/fieldbase/" +
                            configID.insertedId
                    );

                    const Config = await ConfigData.json();

                    SetConfigs(Configs ? [...Configs, Config] : [Config]);
                });

                setNomeSezione(data.NomeSezione);
                setTipo(data.Tipo);
                setVerticalOrder(data.VerticalOrder);
                setMinRole(data.MinRole);

                console.log("Sections Config", Configs);
                console.log("data", data);
                setTypeOfSection(data.Tipo);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <Head>
                <title>Section editor</title>
            </Head>
            <NewFieldVisualizerModal
                isOpen={openModal}
                onActionCloseModal={() => {
                    setOpenModal(false);
                }}
                SectionID={id}
            ></NewFieldVisualizerModal>
            <NewChartTab
                isOpen={openModalChart}
                onActionCloseModal={() => {
                    SetOpenModalChart(false);
                }}
                SectionID={id}
            ></NewChartTab>
            <div>
                <h3>Section info</h3>
                <input
                    value={nomeSezione}
                    onChange={(e) => setNomeSezione(e.target.value)}
                    placeholder="Nome sezione"
                />
                <input
                    value={verticalOrder}
                    onChange={(e) => setVerticalOrder(e.target.value)}
                    placeholder="Vertical order"
                />
                <input
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Tipo"
                />
                <input
                    value={minRole}
                    onChange={(e) => setMinRole(e.target.value)}
                    placeholder="Min role"
                />
            </div>
            <div>
                <h3>Configurazioni</h3>
                <div>
                    <div>
                        <hr></hr>
                        {typeOfSection && (
                            <button
                                onClick={() => {
                                    if (typeOfSection == 0) {
                                        setOpenModal(true);
                                    } else if (typeOfSection == 1) {
                                        SetOpenModalChart(true);
                                    } else if (typeOfSection == 2) {
                                    } else if (typeOfSection == 3) {
                                    }
                                }}
                            >
                                Add config
                            </button>
                        )}
                        <hr></hr>
                    </div>
                </div>
                <div>
                    {Configs &&
                        Configs.map((c) => {
                            console.log("c", c);

                            if (typeOfSection == 0) {
                                return (
                                    <>
                                        <p>Label: {c.Label1}</p>
                                        <p>Info: {c.Info}</p>
                                        <p>Icon: {c.IconID}</p>
                                        <p>Value Info: {c.ValueInfo}</p>
                                        <p>Query: {c.Query}</p>
                                        <p>Return name: {c.returnName}</p>
                                        <p>
                                            <textarea>TODO</textarea>
                                            <button>Test Query</button>
                                        </p>
                                        <hr />
                                    </>
                                );
                            } else if (typeOfSection == 1) {
                                return (
                                    <>
                                        <p>Name: {c.Name}</p>
                                        <p>HexColor: {c.HexColor}</p>
                                        <h5>Bars:</h5>
                                        {c.Bars.map((B) => {
                                            return (
                                                <>
                                                    <p>Label: {B.Label}</p>
                                                    <p>
                                                        ReturnName:{" "}
                                                        {B.ReturnName}
                                                    </p>
                                                    <p>Query: {B.Query}</p>
                                                </>
                                            );
                                        })}
                                        <hr />
                                    </>
                                );
                            } else if (typeOfSection == 2) {
                            } else if (typeOfSection == 3) {
                            }
                        })}
                </div>
            </div>
        </>
    );
};

export default SectionsEditor;
