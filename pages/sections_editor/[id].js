import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Head from "next/head";
import NewFieldVisualizerModal from "../../components/modal/NewFieldVisualizerModal";
import NewChartTab from "../../components/modal/NewChartTab";
import style from "../../styles/info.module.css";

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
                const sectionsConfigResponse = await fetch("http://localhost:3000/api/dynamicSections/" + id);

                const data = await sectionsConfigResponse.json();
                if (data) {
                    data.RelatedConfigData.map(async (configID) => {
                        console.log("configID", configID.insertedId);
                        const ConfigData = await fetch("http://localhost:3000/api/visualizer/fieldbase/" + configID.insertedId);

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
                <div className={style.FieldContainer}>
                    <div className={style.ModalField}>
                        <div>
                            <label>Nome</label>
                            <br />
                            <input type={"text"} placeholder="Nome..." name="Nome" value={nomeSezione} onChange={(e) => setNomeSezione(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={style.ModalField}>
                        <div>
                            <label>Ordine Verticale</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Ordine Verticale..."
                                name="Ordine Verticale"
                                value={verticalOrder}
                                onChange={(e) => setVerticalOrder(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={style.ModalField}>
                        <div>
                            <label>Tipo</label>
                            <br />
                            <input type={"text"} placeholder="Tipo..." name="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={style.ModalField}>
                        <div>
                            <label>Ruolo Minimo</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Ruolo Minimo..."
                                name="Ruolo Minimo"
                                value={minRole}
                                onChange={(e) => setMinRole(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div>
                <h3>Configurazioni</h3>
                <div>
                    <div>
                        {typeOfSection && (
                            <button
                                className={style.ButtonStandard}
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
                                        <VisualizeInfo info={c}></VisualizeInfo>
                                    </>
                                );
                            } else if (typeOfSection == 1) {
                                return (
                                    <>
                                        <h1>chart</h1>
                                        <ChartInfo info={c}></ChartInfo>
                                    </>
                                );
                                <hr></hr>;
                            } else if (typeOfSection == 2) {
                            } else if (typeOfSection == 3) {
                            }
                        })}
                </div>
            </div>
        </>
    );
};

function ChartInfo({ info }) {
    return (
        <div className={style.InfoContainer}>
            <div className={style.FieldContainer}>
                <div className={style.ModalField}>
                    <div>
                        <label>Nome</label>
                        <br />
                        <input type={"text"} placeholder="Nome..." name="Nome" value={info.Name}></input>
                    </div>
                </div>
            </div>

            <div className={style.FieldContainer}>
                <h2>Bars:</h2>
            </div>

            <div className={style.InputContainer}>
                {info.Bars.map((B, index) => {
                    return <BarsInfo bar={B} key={index}></BarsInfo>;
                })}
                <hr />
            </div>
        </div>
    );
}

function BarsInfo({ bar }) {
    return (
        <div className={style.SectionLine}>
            <div className={style.Cell}>
                <p className={style.SectionCell}>
                    <label>Label</label>
                    <br></br>
                    <input value={bar.Label} type="text"></input>
                </p>
            </div>
            <div className={style.Cell}>
                <p className={style.SectionCell}>
                    <label>Return Name</label>
                    <br></br>
                    <input value={bar.ReturnName} type="text"></input>
                </p>
            </div>
            <div className={style.Cell}>
                <p className={style.SectionCell}>
                    <label>Query</label>
                    <br></br>
                    <input value={bar.Query} type="text"></input>
                </p>
            </div>
        </div>
    );
}

function VisualizeInfo({ info }) {
    return (
        <div className={style.InfoContainer}>
            <div className={style.FieldContainer}>
                <div className={style.ModalField}>
                    <div>
                        <label>Label</label>
                        <br />
                        <input type={"text"} placeholder="Label..." name="Label" value={info.Label}></input>
                    </div>
                </div>

                <div className={style.ModalField}>
                    <div>
                        <label>Info</label>
                        <br />
                        <input type={"text"} placeholder="Info..." name="Info" value={info.Info}></input>
                    </div>
                </div>

                <div className={style.ModalField}>
                    <div>
                        <label>Icona</label>
                        <br />
                        <input type={"text"} placeholder="Icona..." name="Icona" value={info.Icon}></input>
                    </div>
                </div>
            </div>

            <div className={style.FieldContainer}>
                <div className={style.ModalField}>
                    <div>
                        <label>Valore Info</label>
                        <br />
                        <input type={"text"} placeholder="Valore Info..." name="Valore info" value={info.ValueInfo}></input>
                    </div>
                </div>

                <div className={style.ModalField}>
                    <div>
                        <label>Query</label>
                        <br />
                        <input type={"text"} placeholder="Query..." name="Query" value={info.Query}></input>
                    </div>
                </div>

                <div className={style.ModalField}>
                    <div>
                        <label>Nome Ritorno</label>
                        <br />
                        <input type={"text"} placeholder="Nome Ritorno..." name="Nome Ritorno" value={info.returnName}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionsEditor;
