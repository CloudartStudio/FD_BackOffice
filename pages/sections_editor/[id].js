import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import fetch from "node-fetch";
import Head from "next/head";
import NewFieldVisualizerModal from "../../components/modal/NewFieldVisualizerModal";
import NewChartTab from "../../components/modal/NewChartTab";
import style from "../../styles/info.module.css";
import EditPageContext from "../../context/editPageContext";

const SectionsEditor = () => {
    const [Configs, SetConfigs] = useState([]);
    const [typeOfSection, setTypeOfSection] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalChart, SetOpenModalChart] = useState(false);
    const [nomeSezione, setNomeSezione] = useState("");
    const [tipo, setTipo] = useState("");
    const [verticalOrder, setVerticalOrder] = useState("");
    const [minRole, setMinRole] = useState("");
    const [indexOfPage, SetIndexOfPage] = useState(0);

    const selectId = useRef(null);

    const router = useRouter();
    const { id } = router.query;

    const context = useContext(EditPageContext);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                SetConfigs([]);
                console.log("Inizio fetch");
                const sectionsConfigResponse = await fetch("http://localhost:3000/api/dynamicSections/" + id);

                const data = await sectionsConfigResponse.json();
                if (data) {
                    data.RelatedConfigData.map(async (configID, index) => {
                        const ConfigData = await fetch("http://localhost:3000/api/visualizer/fieldbase/" + configID.insertedId);

                        const Config = await ConfigData.json();
                        console.log("config", Config);
                        console.log("index", index);

                        SetConfigs((prev) => {
                            if (prev.find((c) => c._id == Config._id)) {
                                return prev;
                            }
                            return [...prev, Config];
                        });
                    });

                    setNomeSezione(data.NomeSezione);
                    setTipo(data.Tipo);
                    setVerticalOrder(data.VerticalOrder);
                    setMinRole(data.MinRole);

                    setTypeOfSection(data.Tipo);
                }
            }
        };
        if (indexOfPage === 0) fetchData();
    }, [id, indexOfPage]);

    return (
        <>
            <Head>
                <title>Section editor</title>
            </Head>
            {indexOfPage === 0 && (
                <div className={style.Info}>
                    <div className={style.InfoSection}>
                        <h3>{nomeSezione} - info</h3>
                        <br></br>
                        {context.PageInfo && (
                            <>
                                <select
                                    className={style.Select}
                                    value={id}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        router.replace("/sections_editor/" + e.target.value, undefined, { shallow: false });
                                    }}
                                >
                                    {context.PageInfo.relatedSections &&
                                        context.PageInfo.relatedSections.map((s) => {
                                            return <option value={s}>{s}</option>;
                                        })}
                                </select>
                            </>
                        )}
                        <p>
                            <b>
                                <i>Vertical Order : {verticalOrder}</i>
                            </b>
                            <b>
                                <i>Tipo : {tipo}</i>
                            </b>
                            <b>
                                <i>Ruolo Minimo : {minRole}</i>
                            </b>
                        </p>
                    </div>
                    <div className={style.InfoSection}>
                        <div>
                            <div>
                                {!Configs && <h1>Non ci sono configurazioni</h1>}
                                {typeOfSection && (
                                    <button
                                        className={style.ButtonStandard}
                                        onClick={() => {
                                            if (typeOfSection == 0) {
                                                setOpenModal(true);
                                                SetIndexOfPage(1);
                                            } else if (typeOfSection == 1) {
                                                SetOpenModalChart(true);
                                                SetIndexOfPage(2);
                                            } else if (typeOfSection == 2) {
                                            } else if (typeOfSection == 3) {
                                            }
                                        }}
                                    >
                                        Add config
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            {Configs &&
                                Configs.map((c) => {
                                    if (typeOfSection == 0) {
                                        return (
                                            <>
                                                <VisualizeInfo info={c}></VisualizeInfo>
                                            </>
                                        );
                                    } else if (typeOfSection == 1) {
                                        return (
                                            <>
                                                <ChartInfo info={c}></ChartInfo>
                                            </>
                                        );
                                    } else if (typeOfSection == 2) {
                                    } else if (typeOfSection == 3) {
                                    }
                                })}
                        </div>
                    </div>
                </div>
            )}

            {indexOfPage === 1 && (
                <NewFieldVisualizerModal
                    isOpen={openModal}
                    onActionCloseModal={() => {
                        setOpenModal(false);
                        SetIndexOfPage(0);
                    }}
                    SectionID={id}
                ></NewFieldVisualizerModal>
            )}

            {indexOfPage === 2 && (
                <NewChartTab
                    isOpen={openModalChart}
                    onActionCloseModal={() => {
                        SetOpenModalChart(false);
                        SetIndexOfPage(0);
                    }}
                    SectionID={id}
                ></NewChartTab>
            )}
        </>
    );
};

function ChartInfo({ info }) {
    return (
        <div className={style.InfoContainer}>
            <div className={style.FieldContainer}>
                <h2>
                    <b>
                        <i>grafico: </i>
                        {"  " + info.Name}
                    </b>
                </h2>
            </div>

            <div className={style.InputContainer}>
                {info.Bars &&
                    info.Bars.map((B, index) => {
                        return <BarsInfo bar={B} key={index}></BarsInfo>;
                    })}
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
