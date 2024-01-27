import style from "../../../styles/queryeditor.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoMdTrash } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaObjectGroup } from "react-icons/fa6";
import { FaSearchengin, FaLayerGroup } from "react-icons/fa";
import axios from "axios";
import PreviewGraph from "../../../components/PreviewGraph";
import PreviewVisualizer from "../../../components/PreviewVisualizer";
import ModelProvider from "../../../models/dto/GraphDTO/ModelProvider";

const RenderData = () => {
    const router = useRouter();
    const configID = router.query.configInfo[0];
    const configType = parseInt(router.query.configInfo[1]);
    const [PreviewModel, setPreviewModel] = useState(null);
    let baseModel = ModelProvider(configType);
    let PreviewComponent = <></>;
    if (configType == 0) {
        PreviewComponent = (
            <div className={style.Preview}>
                {PreviewModel && (
                    <PreviewGraph graphName={"grafico di prova"} isXAxis={true} key={1} legendTop={true} GraphDataContainer={PreviewModel}></PreviewGraph>
                )}
            </div>
        );
    } else if (configType == 1) {
        PreviewComponent = <div className={style.Preview}>{PreviewModel && <PreviewVisualizer GraphDataContainer={PreviewModel}></PreviewVisualizer>}</div>;
    }

    const [QuarableTable, setQuarableTable] = useState([]);
    const [activeTable, setActiveTable] = useState(null);
    const [QuarableTableColumns, setQuarableTableColumns] = useState([]);
    const [orderByFields, setOrderByFields] = useState([]);

    const [QueryModelContainer, SetQueryModelContainer] = useState([[...baseModel]]);

    //#region Handlers
    const handleDragStart = (event, element) => {
        event.dataTransfer.setData("text/plain", JSON.stringify(element));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const QueryStructureContainerFactory = (QueryModelContainer) => {
        const metadata = [];

        QueryModelContainer.map((QueryModel) => {
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
                    if (q.funzioni_campo) {
                        QueryStructure.select.push(
                            q.funzioni_campo.command +
                                "(" +
                                q.valore_campo.columun.COLUMN_NAME +
                                ") as " +
                                '"' +
                                q.funzioni_campo.command +
                                "_" +
                                q.valore_campo.columun.COLUMN_NAME +
                                '"'
                        );
                    } else {
                        QueryStructure.select.push(q.valore_campo.columun.COLUMN_NAME);
                    }
                }

                if (q.isGroupingField) {
                    QueryStructure.group.push(q.valore_campo.columun.COLUMN_NAME);
                }

                if (q.having) {
                    QueryStructure.having.push({
                        ...q.havingCondition,
                        column: q.valore_campo.columun.COLUMN_NAME,
                    });
                }
            });

            if (QueryStructure.select.length > 0) {
                QueryStructure.from = activeTable.nome_tabella;
            }

            if (orderByFields.length > 0) {
                QueryStructure.order = orderByFields.map((el) => {
                    return {
                        column: el.columun.COLUMN_NAME,
                        direction: el.direction,
                    };
                });
            }

            metadata.push(QueryStructure);
        });

        return metadata;
    };

    const HandlePreviewButton = () => {
        if (QueryModelContainer.some((dataset) => dataset.find((q) => q.Error))) {
            alert("campo con errore");
            return;
        }
        if (QueryModelContainer.some((dataset) => dataset.find((q) => q.querable && !q.valore_campo))) {
            alert("campo querable senza valore");
            return;
        }

        const metadata = QueryStructureContainerFactory(QueryModelContainer);

        if (metadata.length > 0) {
            axios
                .post("http://localhost:3000/api/query/SimpleSelect", { metadata })
                .then((result) => {
                    const { data } = result;
                    const finalQueryModelContainer = [];
                    QueryModelContainer.map((QueryModel, index) => {
                        const finalQueryModel = [];
                        QueryModel.map((q) => {
                            const tempObj = {};
                            if (!q.funzioni_campo) {
                                if (q.querable) {
                                    tempObj.coordinate = q.nome_campo;
                                    tempObj.data = data[index].map((el) => el[q.valore_campo.columun.COLUMN_NAME]);
                                } else {
                                    tempObj.coordinate = q.nome_campo;
                                    tempObj.data = q.valore_campo;
                                }
                            } else {
                                tempObj.coordinate = q.nome_campo;
                                tempObj.data = data[index].map((el) => el[q.funzioni_campo.command + "_" + q.valore_campo.columun.COLUMN_NAME]);
                            }
                            finalQueryModel.push(tempObj);
                        });
                        finalQueryModelContainer.push(finalQueryModel);
                    });

                    setPreviewModel(finalQueryModelContainer);
                })
                .catch((error) => {
                    alert("ERROR");
                });
        } else {
            alert("seleziona almeno un campo");
        }
    };

    const HandleSaveButton = () => {
        if (QueryModelContainer.some((dataset) => dataset.find((q) => q.Error))) {
            alert("campo con errore");
            return;
        }
        if (QueryModelContainer.some((dataset) => dataset.find((q) => q.querable && !q.valore_campo))) {
            alert("campo querable senza valore");
            return;
        }

        const metadata = QueryStructureContainerFactory(QueryModelContainer);

        if (metadata.length > 0) {
            axios
                .post("http://localhost:3000/api/query/SaveQuery", { QueryModelContainer, metadata, configID })
                .then((result) => {
                    alert("salvato");
                })
                .catch((error) => {
                    alert("ERROR");
                });
        } else {
            alert("seleziona almeno un campo");
        }
    };

    const handleSetQueryModelContainer = (nomeCampoModel, valoreCampo, DataSetIndex, nomeCampoQuery) => {
        SetQueryModelContainer((prev) => {
            const newQueryModel = [...prev[DataSetIndex]];
            const index = newQueryModel.findIndex((SearchQ) => SearchQ.nome_campo === nomeCampoQuery);
            newQueryModel[index][nomeCampoModel] = valoreCampo;
            return prev.map((el, i) => {
                if (i == DataSetIndex) return newQueryModel;
                return el;
            });
        });
    };

    const handleDrop = (event, querableObject, modelIndex) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        if (data.command) {
            const querableItems = QueryModelContainer[modelIndex].map((q) => {
                if (q.querable) return q;
            });
            if (!ExistValueInQueryModelContainer("isGroupingField", true, modelIndex)) {
                const querableItemsNumber = querableItems.filter((q) => q != undefined).length;
                if (querableItemsNumber != 1) {
                    alert("se vuoi usare delle funzioni su un campo, devi selezionare solo quel campo, oppure usare il raggruppamento");
                    return;
                }
            }

            if (data.command == "MAX" || data.command == "MIN" || data.command == "AVG" || data.command == "SUM" || data.command == "COUNT") {
                if (querableObject.tipo_campo != "number" && querableObject.tipo_campo != "any") {
                    alert("il tipo di campo non è compatibile");
                    return;
                }
            }

            if (querableObject.Error && querableObject.Error.Code == 1) {
                querableObject.Error = null;
            }

            handleSetQueryModelContainer("funzioni_campo", data, modelIndex, querableObject.nome_campo);
        } else {
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

            handleSetQueryModelContainer("valore_campo", data, modelIndex, querableObject.nome_campo);
        }
    };
    //#endregion

    const ExistValueInQueryModelContainer = (nomeCampoAssert, AssertValue, DataSetIndex) => {
        const newQueryModel = [...QueryModelContainer[DataSetIndex]];
        console.log(newQueryModel, "newQueryModel");
        console.log(nomeCampoAssert, AssertValue, DataSetIndex, "nomeCampoAssert, AssertValue, DataSetIndex");
        const index = newQueryModel.findIndex((q) => q[nomeCampoAssert] == AssertValue);
        return index == -1 ? false : true;
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:3000/api/query/Tabels")
                .then((result) => {
                    result.json().then((data) => {
                        setQuarableTable(data);
                    });
                })
                .catch((error) => {
                    return [];
                });
        };
        fetchData();
    }, []);

    return (
        <div className={style.Modal}>
            <div className={style.ModalBody}>
                <div className={style.ToolsView}>
                    <TableTools
                        handleDragStart={handleDragStart}
                        setActiveTable={setActiveTable}
                        QueryModelContainer={QueryModelContainer}
                        QuarableTable={QuarableTable}
                        QuarableTableColumns={QuarableTableColumns}
                        setQuarableTableColumns={setQuarableTableColumns}
                        activeTable={activeTable}
                    ></TableTools>
                    <ToolsView orderByFields={orderByFields} setOrderByFields={setOrderByFields} handleDragStart={handleDragStart}></ToolsView>
                </div>
                <QuerySection
                    handleSetQueryModelContainer={handleSetQueryModelContainer}
                    QueryModelContainer={QueryModelContainer}
                    SetQueryModelContainer={SetQueryModelContainer}
                    baseModel={baseModel}
                    HandlePreviewButton={HandlePreviewButton}
                    HandleSaveButton={HandleSaveButton}
                    PreviewComponent={PreviewComponent}
                    activeTable={activeTable}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                ></QuerySection>
            </div>
        </div>
    );
};

const EditQueryModelSmallButton = ({ handleSetQueryModelContainer, icona, params, querable }) => {
    return (
        <button
            onClick={() => {
                handleSetQueryModelContainer(...params);
            }}
            style={{
                backgroundColor: querable ? "#2363d2" : "",
                color: querable ? "#999" : "",
            }}
            className={style.smallBtn}
        >
            {icona}
        </button>
    );
};

const TableTools = ({ handleDragStart, setActiveTable, setQuarableTableColumns, QuarableTable, QuarableTableColumns, activeTable, QueryModelContainer }) => {
    return (
        <div className={style.ToolTabProp}>
            <div className={style.ToolTab}>
                {console.log(QuarableTable, "QuarableTable")}
                {QuarableTable &&
                    QuarableTable.map((table) => {
                        if (activeTable == table) {
                            return (
                                <div
                                    className={style.active}
                                    style={QueryModelContainer[0].find((q) => q.valore_campo != null) ? { backgroundColor: "#2363d2" } : {}}
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
                                    const almeno_un_campo_valorizzato = QueryModelContainer[0].find((q) => q.valore_campo != null);
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
    );
};

const ToolsView = ({ orderByFields, setOrderByFields, handleDragStart }) => {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <div className={style.ToolTabAction}>
            <ul className={style.HeaderToolTabAction}>
                <li
                    onClick={() => {
                        setActiveTab(1);
                    }}
                    className={activeTab == 1 ? style.active : ""}
                >
                    funzioni
                </li>
                <li
                    onClick={() => {
                        setActiveTab(2);
                    }}
                    className={activeTab == 2 ? style.active : ""}
                >
                    ordinamento
                </li>
            </ul>
            {activeTab == 1 && <FunctionButton handleDragStart={handleDragStart}></FunctionButton>}
            {activeTab == 2 && <OrderTools orderByFields={orderByFields} setOrderByFields={setOrderByFields}></OrderTools>}
        </div>
    );
};

const FunctionButton = ({ handleDragStart }) => {
    return (
        <ul className={style.BodyToolTabAction}>
            <li>
                <div style={{ backgroundColor: "#ff6666b4" }} draggable onDragStart={(event) => handleDragStart(event, { command: "MAX", color: "#ff6666b4" })}>
                    MAX
                </div>
            </li>
            <li>
                <div style={{ backgroundColor: "#66ff66b4" }} draggable onDragStart={(event) => handleDragStart(event, { command: "MIN", color: "#66ff66b4" })}>
                    MIN
                </div>
            </li>
            <li>
                <div style={{ backgroundColor: "#6666FFb4" }} draggable onDragStart={(event) => handleDragStart(event, { command: "AVG", color: "#6666FFb4" })}>
                    AVG
                </div>
            </li>
            <li>
                <div style={{ backgroundColor: "#66f6f6b4" }} draggable onDragStart={(event) => handleDragStart(event, { command: "SUM", color: "#66f6f6b4" })}>
                    SUM
                </div>
            </li>
            <li>
                <div
                    style={{ backgroundColor: "#f6f666b4" }}
                    draggable
                    onDragStart={(event) => handleDragStart(event, { command: "COUNT", color: "#f6f666b4" })}
                >
                    COUNT
                </div>
            </li>
        </ul>
    );
};

const OrderTools = ({ orderByFields, setOrderByFields }) => {
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));

        setOrderByFields((prev) => {
            return [
                ...prev,
                {
                    ...data,
                    direction: "asc",
                    index: prev.length,
                },
            ];
        });
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={(e) => {
                handleDrop(e);
            }}
            style={{
                backgroundColor: "#44444466",
                height: "10vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                border: "1px solid #44444466",
                margin: "5px 0px",
                flexDirection: "row",
            }}
            className={style.BodyToolTabAction}
        >
            {orderByFields &&
                orderByFields
                    .sort((a, b) => a.index - b.index)
                    .map((field) => (
                        <div
                            style={{
                                flex: 1,
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <button
                                onClick={() => {
                                    setOrderByFields((prev) => {
                                        const test = prev.map((el) => {
                                            if (el.index == field.index)
                                                return {
                                                    ...el,
                                                    index: el.index - 1,
                                                };
                                            else if (el.index == field.index - 1)
                                                return {
                                                    ...el,
                                                    index: el.index + 1,
                                                };
                                            else return el;
                                        });
                                        return test;
                                    });
                                }}
                                style={{ flex: 1, margin: "auto 10px" }}
                            >
                                ⬅️
                            </button>
                            <div
                                style={{
                                    backgroundColor: "#44444466",
                                    width: "90%",
                                    height: "8vh",
                                    color: "white",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "0px auto",
                                    flex: 8,
                                }}
                            >
                                <div>{field.columun.COLUMN_NAME}</div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        margin: "0px 5px",
                                        textAlign: "center",
                                        fontSize: "1vh",
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            setOrderByFields((prev) => {
                                                const test = prev.map((el) => {
                                                    if (el.index == field.index)
                                                        return {
                                                            ...el,
                                                            direction: el.direction === "asc" ? "desc" : "asc",
                                                        };
                                                    else return el;
                                                });
                                                return test;
                                            });
                                        }}
                                        style={{
                                            flex: 1,
                                            fontSize: "1vh",
                                            padding: "5px",
                                            margin: "1px 1px",
                                            backgroundColor: field.direction === "asc" ? "#2363d2" : "",
                                        }}
                                    >
                                        {field.direction === "asc" ? "asc" : "desc"}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setOrderByFields((prev) => {
                                                return prev.filter((el) => el.index != field.index);
                                            });
                                        }}
                                        style={{
                                            flex: 1,
                                            fontSize: "1vh",
                                            padding: "5px",
                                            margin: "1px 1px",
                                        }}
                                    >
                                        trash
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setOrderByFields((prev) => {
                                        const test = prev.map((el) => {
                                            if (el.index == field.index)
                                                return {
                                                    ...el,
                                                    index: el.index + 1,
                                                };
                                            else if (el.index == field.index + 1)
                                                return {
                                                    ...el,
                                                    index: el.index - 1,
                                                };
                                            else return el;
                                        });
                                        return test;
                                    });
                                }}
                                style={{ flex: 1, margin: "auto 10px" }}
                            >
                                ➡️
                            </button>
                        </div>
                    ))}
        </div>
    );
};

const QuerySection = ({
    activeTable,
    handleSetQueryModelContainer,
    QueryModelContainer,
    SetQueryModelContainer,
    baseModel,
    HandlePreviewButton,
    HandleSaveButton,
    PreviewComponent,
    handleDragOver,
    handleDrop,
}) => {
    return (
        <div className={style.QueryVisualizer}>
            <div className={style.Visualizer}>
                {QueryModelContainer.map((QueryModel, DataSetIndex) => {
                    return (
                        <>
                            <div className={style.VisualizerDataSet}>
                                {QueryModel.map((q) => {
                                    if (q.querable) {
                                        return (
                                            <QuerableField
                                                SetQueryModelContainer={SetQueryModelContainer}
                                                QueryModelContainer={QueryModelContainer}
                                                handleDrop={handleDrop}
                                                q={q}
                                                handleSetQueryModelContainer={handleSetQueryModelContainer}
                                                DataSetIndex={DataSetIndex}
                                                handleDragOver={handleDragOver}
                                            ></QuerableField>
                                        );
                                    } else {
                                        return (
                                            <NonQuerableField
                                                q={q}
                                                handleSetQueryModelContainer={handleSetQueryModelContainer}
                                                DataSetIndex={DataSetIndex}
                                                activeTable={activeTable}
                                            ></NonQuerableField>
                                        );
                                    }
                                })}
                            </div>
                        </>
                    );
                })}
            </div>
            <div className={style.CommandPreview}>
                <button
                    className={style.buttonBig}
                    onClick={() => {
                        SetQueryModelContainer((prev) => {
                            return [...prev, [...baseModel]];
                        });
                    }}
                >
                    DATASET
                </button>
                <button className={style.buttonBig} onClick={HandleSaveButton}>
                    SALVA
                </button>
                <button className={style.buttonBig} onClick={HandlePreviewButton}>
                    ANTEPRIMA
                </button>
            </div>
            {PreviewComponent}
        </div>
    );
};

const NonQuerableField = ({ q, handleSetQueryModelContainer, DataSetIndex, activeTable }) => {
    const input_type =
        q.tipo_campo == "string" ? "text" : q.tipo_campo == "number" ? "number" : q.tipo_campo == "date" ? "date" : q.tipo_campo == "color" ? "color" : "text";
    return (
        <div id={q.nome_campo} className={style.ModalField}>
            <label className={style.ModalFieldLabel}>
                {q.label}
                <div>
                    <EditQueryModelSmallButton
                        handleSetQueryModelContainer={handleSetQueryModelContainer}
                        params={["querable", true, DataSetIndex, q.nome_campo]}
                        querable={q.querable}
                        icona={<FaSearchengin />}
                    />
                    {input_type == "color" && (
                        <button
                            onClick={() => {
                                handleSetQueryModelContainer("valore_campo", "RANDOM", DataSetIndex, q.nome_campo);
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
                </div>
            </label>
            <div style={{ position: "relative" }} className={style.SelectField}>
                <input
                    disabled={!activeTable ? "disabled" : ""}
                    type={input_type}
                    style={{
                        padding: "1px",
                        width: "100%",
                        backgroundColor: "transparent",
                        opacity: input_type != "color" ? "1" : "0",
                        border: "none",
                        height: "100%",
                        borderRadius: "5px",
                        zIndex: "10000",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        display: "block",
                    }}
                    onChange={(e) => {
                        handleSetQueryModelContainer("valore_campo", e.target.value, DataSetIndex, q.nome_campo);
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
};

const QuerableField = ({ SetQueryModelContainer, QueryModelContainer, q, handleDrop, handleSetQueryModelContainer, DataSetIndex, handleDragOver }) => {
    const handleGroupBy = () => {
        if (q.isGroupingField) {
            handleSetQueryModelContainer("isGroupingField", false, DataSetIndex, q.nome_campo);
            let newQueryModel = [...QueryModelContainer[DataSetIndex]];

            const QueryWithGrupping = newQueryModel.filter((q) => q.isGroupingField);

            if (QueryWithGrupping.length == 1) {
                newQueryModel.map((queryCheck, index) => {
                    if (queryCheck.querable) queryCheck.Error = null;
                });
                SetQueryModelContainer((prev) => {
                    return prev.map((el, i) => {
                        if (i == DataSetIndex) return newQueryModel;
                        return el;
                    });
                });
                return;
            }
        } else {
            handleSetQueryModelContainer("isGroupingField", true, DataSetIndex, q.nome_campo);
            const newQueryModel = [...QueryModelContainer[DataSetIndex]];
            newQueryModel.map((queryCheck) => {
                if (queryCheck.querable && queryCheck != q)
                    if (queryCheck.isGroupingField || queryCheck.funzioni_campo) {
                        queryCheck.Error = null;
                    } else {
                        queryCheck.Error = {
                            Code: 1,
                            MessageError: "se il campo non è raggruppato, deve avere una funzione",
                        };
                    }
                else queryCheck.Error = null;
            });
            SetQueryModelContainer((prev) => {
                return prev.map((el, i) => {
                    if (i == DataSetIndex) return newQueryModel;
                    return el;
                });
            });
        }
    };

    const [open, setOpen] = useState(false);

    const handleClose = (havingCondition) => {
        setOpen(false);
        console.log(havingCondition, "havingCondition");
        if (havingCondition) {
            handleSetQueryModelContainer("havingCondition", havingCondition, DataSetIndex, q.nome_campo);
            handleSetQueryModelContainer("having", true, DataSetIndex, q.nome_campo);
        } else {
            handleSetQueryModelContainer("havingCondition", null, DataSetIndex, q.nome_campo);
            handleSetQueryModelContainer("having", false, DataSetIndex, q.nome_campo);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div id={q.nome_campo} className={style.ModalField}>
            <PopUpHaving open={open} handleClose={handleClose} q={q}></PopUpHaving>
            <label className={style.ModalFieldLabel}>
                {q.label}
                <div>
                    <EditQueryModelSmallButton
                        handleSetQueryModelContainer={handleSetQueryModelContainer}
                        params={["querable", false, DataSetIndex, q.nome_campo]}
                        querable={q.querable}
                        icona={<FaSearchengin />}
                    />
                    {q.valore_campo && (
                        <button
                            className={style.smallBtn}
                            onClick={() => {
                                handleSetQueryModelContainer("valore_campo", null, DataSetIndex, q.nome_campo);
                            }}
                        >
                            <IoMdTrash></IoMdTrash>
                        </button>
                    )}
                    <button
                        className={style.smallBtn}
                        style={{
                            backgroundColor: q.isGroupingField ? "#2363d2" : "",
                        }}
                        onClick={handleGroupBy}
                    >
                        <FaObjectGroup></FaObjectGroup>
                    </button>

                    {q.isGroupingField && (
                        <button
                            className={style.smallBtn}
                            style={{
                                backgroundColor: q.having ? "#2363d2" : "",
                            }}
                            onClick={handleOpen}
                        >
                            <FaLayerGroup></FaLayerGroup>
                        </button>
                    )}
                </div>
            </label>
            <div
                onDragOver={handleDragOver}
                onDrop={(e) => {
                    handleDrop(e, q, DataSetIndex);
                }}
                style={{
                    backgroundColor: q.isGroupingField ? "#aa2222bb" : "#44444466",
                    border: q.funzioni_campo ? "6px solid " + q.funzioni_campo.color : "",
                }}
                className={style.SelectField}
            >
                {q.valore_campo && q.valore_campo.columun.COLUMN_NAME}
            </div>
            {q.Error && <div style={{ color: "#dd4444aa", fontSize: "1vh", fontWeight: 700 }}>{q.Error.MessageError}</div>}
        </div>
    );
};

import DataModel_Condition from "../../../models/dto/GraphDTO/DataModel_Condition";

const PopUpHaving = ({ open, handleClose, q }) => {
    const [form, setForm] = useState({
        value: "",
        type: "",
    });

    useState;

    const handleform = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    useState(() => {
        if (q.having)
            setForm((prev) => {
                return {
                    value: q.havingCondition.value,
                    type: q.havingCondition.type,
                };
            });
    }, [q]);
    return (
        <>
            {open && (
                <div
                    style={{
                        display: "block",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#88888844",
                        zIndex: "1000",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "fixed",
                            top: "35%",
                            left: "35%",
                            width: "30%",
                            height: "20%",
                            backgroundColor: "#ffffff",
                            zIndex: "100001",
                            flexDirection: "column",
                            borderRadius: "10px",
                            padding: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                                flexDirection: "row",
                                flex: 2,
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
                                <label htmlFor="type" className={style.ModalFieldLabel}>
                                    Condizione
                                </label>
                                <select value={form.type} onChange={handleform} name="type">
                                    {DataModel_Condition().map((el) => {
                                        return <option value={el.key}>{el.descrizione}</option>;
                                    })}
                                </select>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
                                <label htmlFor="type" className={style.ModalFieldLabel}>
                                    Valore
                                </label>
                                <input value={form.value} onChange={handleform} name="value" type="text"></input>
                            </div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                                flexDirection: "row",
                            }}
                        >
                            <button
                                style={{
                                    flex: 1,
                                    margin: "0px 15px",
                                }}
                                onClick={() => {
                                    handleClose(form);
                                }}
                            >
                                OK
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    margin: "0px 15px",
                                }}
                                onClick={() => {
                                    handleClose(null);
                                }}
                            >
                                RIMUOVI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RenderData;
