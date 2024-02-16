import style from "../../styles/modal.module.css";
import PageEditorStyle from "../../styles/renderdata.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import PreviewGraph from "../../components/PreviewGraph";
import PreviewVisualizer from "../../components/PreviewVisualizer";
import ModelProvider from "../../models/dto/GraphDTO/ModelProvider";

export default function render_data() {
    const router = useRouter();
    const Links = router.query.links;

    const [PageData, setPageData] = useState(null);

    useEffect(() => {
        let linkUrl = Links[0];
        const secondPiece = Links[1] ? "/" + Links[1] : "";
        linkUrl = linkUrl + secondPiece;
        if (Links) {
            axios.get("http://localhost:3000/api/cachedpage/" + linkUrl).then((res) => {
                console.log("res", res);
                setPageData(res.data);
            });
        }
    }, [Links]);

    return (
        <div className={style.Modal}>
            <div className={style.ModalBody} style={{ width: "100%", paddingLeft: "0px" }}>
                <div className={PageEditorStyle.PageEditor}>
                    <div className={PageEditorStyle.PageEditorBody}>
                        {!PageData && (
                            <div className={PageEditorStyle.PageEditorPlaceHolder}>
                                <p>
                                    Caricamento in corso...
                                    <div
                                        style={{
                                            opacity: "0.5",
                                            marginTop: "6vh",
                                        }}
                                        className={PageEditorStyle.LoaderContainer}
                                    >
                                        <ThreeCircles
                                            visible={true}
                                            height="350"
                                            width="350"
                                            color="#2a67f9"
                                            ariaLabel="triangle-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div>
                                </p>
                            </div>
                        )}

                        {PageData && (
                            <div className={PageEditorStyle.PageEditorBodyContainer}>
                                {PageData.Sections &&
                                    PageData.Sections.sort((a, b) => a.VerticalOrder - b.VerticalOrder).map((section, index) => {
                                        return (
                                            <div key={index} className={PageEditorStyle.PreviewSection}>
                                                {section.Configurations.sort((a, b) => a.LateralOrder - b.LateralOrder).map((element, indexdue) => {
                                                    return (
                                                        <div key={indexdue} className={PageEditorStyle.ConfigSection}>
                                                            {element.active && (
                                                                <ConfigVisualizer
                                                                    Metadata={element.metadata}
                                                                    Structure={element.structure}
                                                                    tipo={element.Tipo}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ConfigVisualizer = ({ Metadata, Structure, tipo }) => {
    const [PreviewModel, setPreviewModel] = useState(null);
    const metadata = Metadata;
    const structure = Structure;

    useEffect(() => {
        if (metadata && structure)
            axios.post("http://localhost:3000/api/query/DynamicSelection", { metadata }).then((result) => {
                const { data } = result;
                const finalQueryModelContainer = [];
                structure.map((substructure, index) => {
                    const finalQueryModel = [];
                    substructure.map((q) => {
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

                console.log("finalQueryModelContainer", finalQueryModelContainer);
                setPreviewModel(finalQueryModelContainer);
            });
    }, []);

    return (
        <>
            {tipo == 0 && PreviewModel && (
                <PreviewGraph graphName={"grafico di prova"} isXAxis={true} key={1} legendTop={true} GraphDataContainer={PreviewModel}></PreviewGraph>
            )}
            {tipo == 1 && PreviewModel && <PreviewVisualizer GraphDataContainer={PreviewModel}></PreviewVisualizer>}
        </>
    );
};
