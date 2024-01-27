import style from "../../styles/modal.module.css";
import PageEditorStyle from "../../styles/renderdata.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import PreviewGraph from "../../components/PreviewGraph";
import ModelProvider from "../../models/dto/GraphDTO/ModelProvider";

export default function NewPageModal() {
    const router = useRouter();
    const Links = router.query.links;
    let ID = null;

    const [Page, setPage] = useState({
        PageName: "",
        Link: "",
        MinRole: "",
        Sections: [],
        IsAgenzia: false,
    });

    const [pageSections, setPageSections] = useState([]);

    const fetch = async () => {
        if (ID) {
            const resposePage = await axios.get("http://localhost:3000/api/manage/dpage/" + ID);
            const { Nome, Link, RelatedSections, IsActive, IsAgenzia, MinRole } = resposePage.data;
            setPage({
                PageName: Nome,
                Link: Link,
                MinRole: MinRole,
                IsAgenzia: IsAgenzia,
                Sections: RelatedSections,
            });
            let sections = [];
            for (const element of RelatedSections) {
                const responseSection = await axios.get("http://localhost:3000/api/dynamicSections/" + element);
                const { collectionName, Data, IsActive, VerticalOrder, _id } = responseSection.data;
                sections.push({ collectionName: collectionName, data: Data, IsActive: IsActive, VerticalOrder: VerticalOrder, _id: _id });
            }
            setPageSections(sections);
        }
    };

    useEffect(() => {
        let linkUrl = Links[0];
        const secondPiece = Links[1] ? "/" + Links[1] : "";
        linkUrl = linkUrl + secondPiece;
        if (Links) {
            axios.get("http://localhost:3000/api/manage/dpage/links/" + linkUrl).then((res) => {
                const { _id } = res.data;
                ID = _id;
                fetch();
            });
        }
    }, [Links]);

    return (
        <div className={style.Modal}>
            <div className={style.ModalBody} style={{ width: "100%", paddingLeft: "0px" }}>
                <div className={PageEditorStyle.PageEditor}>
                    <div className={PageEditorStyle.PageEditorBody}>
                        {pageSections.length == 0 && (
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

                        {pageSections.length != 0 && (
                            <div className={PageEditorStyle.PageEditorBodyContainer}>
                                {pageSections &&
                                    pageSections.map((section, index) => {
                                        return (
                                            <div key={index} className={PageEditorStyle.PreviewSection}>
                                                {section.data.map((element, indexdue) => {
                                                    return (
                                                        <div key={indexdue} className={PageEditorStyle.ConfigSection}>
                                                            {element.IsSaved && !element.IsActive && (
                                                                <ConfigVisualizer ConfigurationID={element.ConfigurationID} />
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

const ConfigVisualizer = ({ ConfigurationID }) => {
    const [PreviewModel, setPreviewModel] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/manage/dconfig/" + ConfigurationID).then((res) => {
            const { metadata, structure } = res.data.Data;
            if (metadata && metadata.length > 0)
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
        });
    }, []);

    return (
        <div className={style.Preview}>
            {PreviewModel && (
                <PreviewGraph graphName={"grafico di prova"} isXAxis={true} key={1} legendTop={true} GraphDataContainer={PreviewModel}></PreviewGraph>
            )}
        </div>
    );
};
