import style from "../../../styles/queryeditor.module.css";
import React, { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import axios from "axios";
import PreviewGraph from "../../PreviewGraph";

function ParseQueryModelToGraphStruct() {}

export default function QueryEditor() {
    const [QuarableTable, setQuarableTable] = useState([]);
    const [activeTable, setActiveTable] = useState(null);
    const [QuarableTableColumns, setQuarableTableColumns] = useState([]);
    const [QueryResult, setQueryResult] = useState([]);

    const [PreviewModel, setPreviewModel] = useState(null);
    const [QueryModel, SetQueryModel] = useState([
        {
            nome_campo: "labelDataSet",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "etichetta dataset",
        },
        {
            nome_campo: "Labels",
            tipo_campo: "string",
            valore_campo: null,
            querable: true,
            label: "etichetta legenda",
        },
        {
            nome_campo: "GraphData",
            tipo_campo: "any",
            valore_campo: null,
            querable: true,
            label: "Dato visualizzato",
        },
        {
            nome_campo: "backgroundColor",
            tipo_campo: "color",
            valore_campo: null,
            querable: false,
            label: "colore dati",
        },
        {
            nome_campo: "borderColor",
            tipo_campo: "color",
            valore_campo: null,
            querable: false,
            label: "colore bordo dati",
        },
    ]);

    const handleDragStart = (event, element) => {
        event.dataTransfer.setData("text/plain", JSON.stringify(element));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, querableObject) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        if (querableObject.tipo_campo != "any")
            if (data.columun.DATA_TYPE == "int") {
                if (querableObject.tipo_campo != "number") {
                    alert("il tipo di campo non è compatibile");
                    return;
                }
            } else if (data.columun.DATA_TYPE == "varchar") {
                if (querableObject.tipo_campo != "string") {
                    alert("il tipo di campo non è compatibile");
                    return;
                }
            } else if (data.columun.DATA_TYPE == "date") {
                if (querableObject.tipo_campo != "date") {
                    alert("il tipo di campo non è compatibile");
                    return;
                }
            } else if (data.columun.DATA_TYPE == "bit") {
                if (querableObject.tipo_campo != "boolean") {
                    alert("il tipo di campo non è compatibile");
                    return;
                }
            }
        SetQueryModel((prev) => {
            const newQueryModel = [...prev];
            console.log(newQueryModel, "newQueryModel");
            const index = newQueryModel.findIndex((q) => q.nome_campo === querableObject.nome_campo);
            newQueryModel[index].valore_campo = data;
            return newQueryModel;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/query/Tabels")
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return [];
                });
            const data = await response.json();
            setQuarableTable(data);
        };
        fetchData();
    }, []);

    return (
        <div className={style.Modal}>
            <div className={style.ModalBody}>
                <div className={style.ToolsView}>
                    <div className={style.ToolTabProp}>
                        <div className={style.ToolTab}>
                            {QuarableTable &&
                                QuarableTable.map((table) => {
                                    if (activeTable == table) {
                                        return (
                                            <div
                                                className={style.active}
                                                style={QueryModel.find((q) => q.valore_campo != null) ? { backgroundColor: "#2363d2" } : {}}
                                                onClick={() => {
                                                    setQuarableTableColumns(table.colonne);
                                                    setActiveTable(table);
                                                }}
                                            >
                                                {table.nome_tabella}
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            onClick={() => {
                                                //
                                                const almeno_un_campo_valorizzato = QueryModel.find((q) => q.valore_campo != null);
                                                if (!almeno_un_campo_valorizzato) {
                                                    setQuarableTableColumns(table.colonne);
                                                    setActiveTable(table);
                                                }
                                            }}
                                        >
                                            {table.nome_tabella}
                                        </div>
                                    );
                                })}
                        </div>
                        {QuarableTableColumns && QuarableTableColumns.length != 0 && (
                            <div className={style.ToolProp}>
                                {QuarableTableColumns.map((c, index) => {
                                    return (
                                        <div draggable onDragStart={(event) => handleDragStart(event, { columun: c, table: activeTable })}>
                                            {c.COLUMN_NAME}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className={style.ToolTabAction}>
                        <ul className={style.HeaderToolTabAction}>
                            <li className={style.active}>filtri</li>
                            <li>ordinamento</li>
                            <li>raggruppamento</li>
                            <li>calcoli</li>
                        </ul>
                        <ul>
                            <li>
                                <button>max</button>
                            </li>
                            <li>
                                <button>min</button>
                            </li>
                            <li>
                                <button>avg</button>
                            </li>
                            <li>
                                <button>sum</button>
                            </li>
                            <li>
                                <button>count</button>
                            </li>
                            <li>
                                <button>count distinct</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={style.QueryVisualizer}>
                    <div className={style.Visualizer}>
                        {QueryModel &&
                            QueryModel.map((q) => {
                                //q.tipo_campo
                                if (q.querable) {
                                    return (
                                        <div id={q.nome_campo} className={style.ModalField}>
                                            <label>{q.label}</label>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => {
                                                    handleDrop(e, q);
                                                }}
                                                className={style.SelectField}
                                            >
                                                {q.valore_campo && q.valore_campo.columun.COLUMN_NAME}
                                            </div>
                                            {q.valore_campo && (
                                                <button
                                                    onClick={() => {
                                                        SetQueryModel((prev) => {
                                                            const newQueryModel = [...prev];
                                                            const index = newQueryModel.findIndex((SearchQ) => SearchQ.nome_campo === q.nome_campo);
                                                            newQueryModel[index].valore_campo = null;
                                                            return newQueryModel;
                                                        });
                                                    }}
                                                >
                                                    <IoMdTrash></IoMdTrash>
                                                </button>
                                            )}
                                        </div>
                                    );
                                } else {
                                    const input_type =
                                        q.tipo_campo == "string"
                                            ? "text"
                                            : q.tipo_campo == "number"
                                            ? "number"
                                            : q.tipo_campo == "date"
                                            ? "date"
                                            : q.tipo_campo == "color"
                                            ? "color"
                                            : "text";
                                    return (
                                        <div id={q.nome_campo} className={style.ModalField}>
                                            <label>
                                                {q.label}
                                                {input_type == "color" && (
                                                    <button
                                                        onClick={() => {
                                                            SetQueryModel((prev) => {
                                                                const newQueryModel = [...prev];
                                                                const index = newQueryModel.findIndex((SearchQ) => SearchQ.nome_campo === q.nome_campo);
                                                                newQueryModel[index].valore_campo = "RANDOM";
                                                                return newQueryModel;
                                                            });
                                                        }}
                                                        style={{
                                                            backgroundColor: q.valore_campo == "RANDOM" ? "#2363d2" : "",
                                                        }}
                                                        disabled={!activeTable ? "disabled" : ""}
                                                        className={style.smallBtn}
                                                    >
                                                        <GiPerspectiveDiceSixFacesRandom />
                                                    </button>
                                                )}
                                            </label>
                                            <div style={{ position: "relative" }} className={style.SelectField}>
                                                <input
                                                    disabled={!activeTable ? "disabled" : ""}
                                                    type={input_type}
                                                    style={{
                                                        width: input_type != "color" ? "95%" : "100%",
                                                        backgroundColor: input_type != "color" ? "#f1f1f12f" : "transparent",
                                                        opacity: input_type != "color" ? "1" : "0",
                                                        border: "none",
                                                        height: "100%",
                                                        borderRadius: "5px",
                                                        zIndex: "10000",
                                                        position: input_type == "color" ? "absolute" : "",
                                                        top: input_type == "color" ? "0" : "",
                                                        left: input_type == "color" ? "0" : "",
                                                        display: "block",
                                                    }}
                                                    onChange={(e) => {
                                                        SetQueryModel((prev) => {
                                                            const newQueryModel = [...prev];
                                                            const index = newQueryModel.findIndex((SearchQ) => SearchQ.nome_campo === q.nome_campo);
                                                            newQueryModel[index].valore_campo = e.target.value;
                                                            return newQueryModel;
                                                        });
                                                    }}
                                                ></input>
                                                {input_type == "color" && (
                                                    <span
                                                        style={{
                                                            display: "block",
                                                            position: "absolute",
                                                            top: "-1px",
                                                            left: "-1px",
                                                            borderRadius: "10px",
                                                            border: "2px solid " + q.valore_campo,
                                                            backgroundColor: q.valore_campo,
                                                            zIndex: "1",
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                    ></span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                    <div className={style.CommandPreview}>
                        <button className={style.buttonBig}>aggiungi dataset</button>
                        <button
                            className={style.buttonBig}
                            onClick={() => {
                                const QueryStructure = {
                                    select: [],
                                    from: "",
                                    where: [],
                                    order: [],
                                    group: [],
                                    having: [],
                                    limit: [],
                                    join: [],
                                };

                                QueryModel.map((q) => {
                                    if (q.valore_campo && q.querable) {
                                        QueryStructure.select.push(q.valore_campo.columun.COLUMN_NAME);
                                    }
                                });

                                if (QueryStructure.select.length > 0) {
                                    QueryStructure.from = activeTable.nome_tabella;

                                    console.log(QueryStructure, "QueryStructure");

                                    axios
                                        .post("http://localhost:3000/api/query/SimpleSelect", { QueryStructure })
                                        .then((result) => {
                                            console.log(result, "result");
                                            const { data } = result;

                                            console.log(QueryModel, "QueryModel");
                                            const finalQueryModel = [];
                                            QueryModel.map((q) => {
                                                const tempObj = {};
                                                if (q.querable) {
                                                    tempObj.coordinate = q.nome_campo;
                                                    tempObj.data = data.map((el) => el[q.valore_campo.columun.COLUMN_NAME]);
                                                    console.log(tempObj, "tempObj");
                                                } else {
                                                    tempObj.coordinate = q.nome_campo;
                                                    tempObj.data = q.valore_campo;
                                                    console.log(tempObj, "tempObj");
                                                }
                                                finalQueryModel.push(tempObj);
                                            });

                                            setPreviewModel(finalQueryModel);
                                        })
                                        .catch((error) => {
                                            console.log(error, "error");
                                        });
                                } else {
                                    alert("seleziona almeno un campo");
                                }
                            }}
                        >
                            anteprima
                        </button>
                    </div>
                    <div className={style.Preview}>
                        {PreviewModel && (
                            <PreviewGraph graphName={"grafico di prova"} isXAxis={true} key={1} legendTop={true} GraphData={PreviewModel}></PreviewGraph>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
