import style from "../../styles/modal.module.css";
import PageEditorStyle from "../../styles/page_editor.module.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import NotificationContext from "../../context/notificationContext";
import RoleOptions from "../misc/role_options";
import { BsGraphUp } from "react-icons/bs";

export default function NewPartnerModal({ isOpen, onActionCloseModal, id = null }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [isInEdit, setIsInEdit] = useState(false);
    const [Page, setPage] = useState({
        PageName: "",
        Link: "",
        MinRole: "",
        Sections: [],
    });

    const [pageSections, setPageSections] = useState([]);

    const NotificationCtx = useContext(NotificationContext);

    const handleDragStart = (event, element) => {
        event.dataTransfer.setData("text/plain", JSON.stringify(element));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        if (pageSections) {
            setPageSections((prev) => {
                const res = [
                    {
                        VerticalOrder: 0,
                        data: [
                            {
                                NomeSezione: data.name,
                                Tipo: data.type,
                                LateralOrder: 0,
                            },
                        ],
                    },
                ];

                return res;
            });
        }
    };

    const handleDropDirection = (event, direction, verticalOrder) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        if (direction === 0 || direction === 1) {
            setPageSections((prev) => [
                ...prev,
                {
                    VerticalOrder: prev.length + 1,
                    data: [
                        {
                            NomeSezione: data.name,
                            Tipo: data.type,
                            LateralOrder: 0,
                        },
                    ],
                },
            ]);
        } else if (direction === 2 || direction === 3) {
            setPageSections((prev) => {
                const toReturn = prev.map((section) => {
                    if (section.VerticalOrder === verticalOrder) {
                        console.log(section.data, "section.data");
                        const updatedData = [...section.data];
                        if (direction === 2) {
                            updatedData.unshift({
                                NomeSezione: data.name,
                                Tipo: data.type,
                                LateralOrder: section.data.length,
                            });
                        } else if (direction === 3) {
                            updatedData.push({
                                NomeSezione: data.name,
                                Tipo: data.type,
                                LateralOrder: section.data.length,
                            });
                        }
                        return {
                            ...section,
                            data: updatedData,
                        };
                    } else {
                        return section;
                    }
                });
                return toReturn;
            });
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (id && isOpen) {
                setIsInEdit(true);
                const resposePage = await axios.get("http://localhost:3000/api/dynamicPage/" + id);
                const { Nome, Link, RelatedSections, MinRole } = resposePage.data;

                PageName_input.current.value = Nome;
                Link_input.current.value = Link;
                //MinRole_input.current.value = MinRole;

                let sections = [];
                for (const element of RelatedSections) {
                    const responseSection = await axios.get("http://localhost:3000/api/dynamicSections/" + element);
                    const { NomeSezione, VerticalOrder, Tipo, _id } = responseSection.data;
                    sections.push({ NomeSezione, VerticalOrder, Tipo, _id });
                }
                setPageSections(sections);
            }
        };

        fetch();
    }, [isOpen, id]);

    const handleSavePage = async () => {
        const PageName = PageName_input.current.value;
        const Link = Link_input.current.value;
        //const MinRole = MinRole_input.current.value;

        if (PageName && Link && MinRole) {
            const PageObj = {
                ID: id,
                Nome: PageName_input.current.value,
                Link: Link_input.current.value,
                //MinRole: MinRole_input.current.value,
                RelatedSections: pageSections,
            };

            if (isInEdit) {
                PageObj["id"] = id;
                const response = await axios.put("http://localhost:3000/api/dynamicPage", {
                    PageObj: PageObj,
                });
            } else {
                const response = await axios.post("http://localhost:3000/api/dynamicPage", {
                    PageObj: PageObj,
                });
            }
            NotificationCtx.showNotification({
                title: "Salvataggio",
                message: "Il salvataggio è andato a buon fine",
                status: "success",
            });
            onActionCloseModal();
        }
    };

    return (
        <>
            {pageIndex === 0 && (
                <>
                    {isOpen && (
                        <div className={style.Modal}>
                            <div className={style.ModalHeader}>
                                {!isInEdit && <h5>NUOVA PAGINA</h5>}
                                {isInEdit && (
                                    <h5>
                                        MODIFICA PAGINA
                                        {Page.PageName}
                                    </h5>
                                )}
                                <span onClick={onActionCloseModal} className={style.closeBtnModal}>
                                    ✖
                                </span>
                            </div>
                            <div className={style.ModalBody}>
                                <div className={style.ModalBodyHeader}>
                                    <div className={style.ModalField}>
                                        <label>Nome</label>
                                        <br />
                                        <input
                                            value={Page.PageName}
                                            onChange={(e) => {
                                                setPage({
                                                    ...Page,
                                                    PageName: e.target.value,
                                                });
                                            }}
                                            type={"text"}
                                            placeholder="Nome..."
                                            name="Nome"
                                        ></input>
                                    </div>
                                    <div className={style.ModalField}>
                                        <label>Link</label>
                                        <br />
                                        <input
                                            value={Page.Link}
                                            onChange={(e) => {
                                                setPage({
                                                    ...Page,
                                                    Link: e.target.value,
                                                });
                                            }}
                                            type={"text"}
                                            placeholder="Link..."
                                            name="Link"
                                        ></input>
                                    </div>
                                    <RoleOptions
                                        selectedRole={Page.MinRole}
                                        setSelectedRole={(newRole) => {
                                            setPage({
                                                ...Page,
                                                MinRole: newRole,
                                            });
                                        }}
                                    ></RoleOptions>
                                </div>
                                <div className={PageEditorStyle.PageEditor}>
                                    <div className={PageEditorStyle.PageEditorHeader}>
                                        <div className={PageEditorStyle.PageEditorHeadeButtonContainer}>
                                            <div className={PageEditorStyle.PageEditorHeaderDiv}>
                                                <button
                                                    draggable
                                                    onDragStart={(event) => handleDragStart(event, { type: 0, name: "graph" })}
                                                    className={PageEditorStyle.PageEditorHeaderButton}
                                                >
                                                    graph
                                                </button>
                                            </div>
                                            <div className={PageEditorStyle.PageEditorHeaderDiv}>
                                                <button draggable className={PageEditorStyle.PageEditorHeaderButton}>
                                                    graph
                                                </button>
                                            </div>
                                            <div className={PageEditorStyle.PageEditorHeaderDiv}>
                                                <button draggable className={PageEditorStyle.PageEditorHeaderButton}>
                                                    graph
                                                </button>
                                            </div>
                                            <div className={PageEditorStyle.PageEditorHeaderDiv}>
                                                <button draggable className={PageEditorStyle.PageEditorHeaderButton}>
                                                    graph
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={PageEditorStyle.PageEditorBody}>
                                        {pageSections.length == 0 && (
                                            <div
                                                onDrop={(e) => {
                                                    handleDrop(e);
                                                }}
                                                onDragOver={handleDragOver}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "white",
                                                    border: "1px solid black",
                                                }}
                                            ></div>
                                        )}
                                        {pageSections.length != 0 && (
                                            <div className={PageEditorStyle.PageEditorBodyContainer}>
                                                {pageSections &&
                                                    pageSections.map((section, index) => {
                                                        return (
                                                            <div className={PageEditorStyle.PreviewSection}>
                                                                {section.data.map((element) => {
                                                                    return (
                                                                        <div className={PageEditorStyle.ConfigSection}>
                                                                            <div
                                                                                onDrop={(e) => {
                                                                                    handleDropDirection(e, 0, section.VerticalOrder);
                                                                                }}
                                                                                onDragOver={handleDragOver}
                                                                                className={PageEditorStyle.AltoBasso}
                                                                            ></div>
                                                                            <div>
                                                                                <div
                                                                                    onDrop={(e) => {
                                                                                        handleDropDirection(e, 2, section.VerticalOrder);
                                                                                    }}
                                                                                    onDragOver={handleDragOver}
                                                                                    className={PageEditorStyle.DestraSinistra}
                                                                                ></div>
                                                                                <div className={PageEditorStyle.Icon}>
                                                                                    {element.Tipo == 0 && <BsGraphUp></BsGraphUp>}
                                                                                    {element.Tipo == 1 && <div>view</div>}
                                                                                </div>
                                                                                <div
                                                                                    onDrop={(e) => {
                                                                                        alert("cazzo");
                                                                                        handleDropDirection(e, 3, section.VerticalOrder);
                                                                                    }}
                                                                                    onDragOver={handleDragOver}
                                                                                    className={PageEditorStyle.DestraSinistra}
                                                                                ></div>
                                                                            </div>
                                                                            <div
                                                                                onDrop={(e) => {
                                                                                    handleDropDirection(e, 1, section.VerticalOrder);
                                                                                }}
                                                                                onDragOver={handleDragOver}
                                                                                className={PageEditorStyle.AltoBasso}
                                                                            ></div>
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
                            <div className={style.ModalFoot}>
                                <button onClick={handleSavePage} className={style.Success}>
                                    INVIA
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
