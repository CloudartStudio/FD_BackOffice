import style from "../../styles/modal.module.css";
import PageEditorStyle from "../../styles/page_editor.module.css";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NotificationContext from "../../context/notificationContext";
import RoleOptions from "../misc/role_options";
import { BsGraphUp } from "react-icons/bs";
import { RxSection } from "react-icons/rx";
import { MdAddChart } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import IconSelector from "../IconSelector";

export default function NewPageModal({ onActionCloseModal, id = null }) {
    const router = useRouter();

    const [pageIndex, setPageIndex] = useState(0);
    const [isInEdit, setIsInEdit] = useState(false);
    const [Page, setPage] = useState({
        PageName: "",
        Link: "",
        MinRole: "1",
        Sections: [],
        IsAgenzia: false,
    });

    const [pageSections, setPageSections] = useState([]);

    const NotificationCtx = useContext(NotificationContext);

    const handleDeleteSection = async (element, section) => {
        setPageSections((prev) => {
            if (prev.length == 1 && prev[0].data.length == 1) {
                return prev;
            }

            //UNA SEZIONE IN ORIZIONATALE
            if (prev.length == 1) {
                const newSections = prev.map((section) => {
                    const newData = section.data.filter((el) => el !== element);
                    return {
                        ...section,
                        data: newData,
                    };
                });
                return newSections;
            }

            //PIU SEZIONI VERTICALI
            if (prev.length > 1) {
                const s = prev.find((el) => el == section);
                if (s.data.length == 1) {
                    const newSections = prev.filter((el) => el !== section);
                    return newSections;
                } else {
                    const newSections = prev.map((section) => {
                        if (section == s) {
                            const newData = section.data.filter((el) => el !== element);
                            return {
                                ...section,
                                data: newData,
                            };
                        } else {
                            return section;
                        }
                    });
                    return newSections;
                }
            }
        });
    };

    const handleDeleteSavedConfig = async (element, section) => {
        setPageSections((prev) => {
            if (prev.length == 1 && prev[0].data.length == 1) {
                return prev;
            }

            //UNA SEZIONE IN ORIZIONATALE
            if (prev.length == 1) {
                const newSections = prev.map((section) => {
                    const newData = [];
                    section.data.map((el) => {
                        if (el !== element) {
                            newData.push(el);
                        } else {
                            el.IsDeleted = true;
                            newData.push(el);
                        }
                    });
                    return {
                        ...section,
                        data: newData,
                    };
                });
                return newSections;
            }

            //PIU SEZIONI VERTICALI
            if (prev.length > 1) {
                const s = prev.find((el) => el == section);
                if (s.data.length == 1) {
                    const newSections = prev.filter((el) => el !== section);
                    return newSections;
                } else {
                    const newSections = prev.map((section) => {
                        if (section == s) {
                            const newData = [];
                            section.data.map((el) => {
                                if (el !== element) {
                                    newData.push(el);
                                } else {
                                    el.IsDeleted = true;
                                    newData.push(el);
                                }
                            });
                            return {
                                ...section,
                                data: newData,
                            };
                        } else {
                            return section;
                        }
                    });
                    return newSections;
                }
            }
        });
    };

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
            if (id) {
                setIsInEdit(true);
                const resposePage = await axios.get("http://localhost:3000/api/manage/dpage/" + id);
                const { Nome, Link, RelatedSections, IsActive, IsAgenzia, MinRole } = resposePage.data;
                //MinRole_input.current.value = MinRole;

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
                    console.log("CIAO", responseSection.data);
                    const { collectionName, Data, IsActive, VerticalOrder, _id } = responseSection.data;
                    sections.push({
                        collectionName: collectionName,
                        data: Data,
                        IsActive: IsActive,
                        VerticalOrder: VerticalOrder,
                        _id: _id,
                    });
                }
                setPageSections(sections);
            }
        };

        fetch();
    }, [id]);

    const handleSavePage = async () => {
        if (isInEdit) {
            Page["id"] = id;
            const response = await axios.put("http://localhost:3000/api/manage/dpage", {
                Page: {
                    PageName: Page.PageName,
                    Link: Page.Link,
                    MinRole: Page.MinRole,
                    Sections: pageSections,
                    IsAgenzia: Page.IsAgenzia,
                    ID: id,
                },
            });
        } else {
            const response = await axios.post("http://localhost:3000/api/manage/dpage", {
                Page: {
                    PageName: Page.PageName,
                    Link: Page.Link,
                    MinRole: Page.MinRole,
                    Sections: pageSections,
                    IsAgenzia: Page.IsAgenzia,
                },
            });
        }
        NotificationCtx.showNotification({
            title: "Salvataggio",
            message: "Il salvataggio è andato a buon fine",
            status: "success",
        });
        onActionCloseModal();
    };

    return (
        <>
            {pageIndex === 0 && (
                <>
                    <div className={style.Modal}>
                        <div className={style.ModalHeader}>
                            {!isInEdit && <h5>NUOVA PAGINA</h5>}
                            {isInEdit && (
                                <h5>
                                    MODIFICA PAGINA
                                    {" - " + Page.PageName}
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
                                <div className={style.ModalField}>
                                    <label htmlFor="IsAgenzia">Pagina agenzia</label>
                                    <br />
                                    <input
                                        checked={Page.IsAgenzia}
                                        onClick={(e) => {
                                            setPage({
                                                ...Page,
                                                IsAgenzia: !Page.IsAgenzia,
                                            });
                                        }}
                                        type={"checkbox"}
                                        name="IsAgenzia"
                                    ></input>
                                </div>
                                {isInEdit && (
                                    <div className={style.ModalField}>
                                        <button
                                            onClick={(e) => {
                                                router.push("/manage/dpage/subpages/" + id);
                                            }}
                                            type={"checkbox"}
                                            name="IsAgenzia"
                                        >
                                            sotto pagine
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={PageEditorStyle.PageEditor}>
                                <div className={PageEditorStyle.PageEditorHeader}>
                                    <DraggableTypesOfConfig handleDragStart={handleDragStart}></DraggableTypesOfConfig>
                                </div>
                                <div className={PageEditorStyle.PageEditorBody}>
                                    {pageSections.length == 0 && (
                                        <div
                                            onDrop={(e) => {
                                                handleDrop(e);
                                            }}
                                            onDragOver={handleDragOver}
                                            className={PageEditorStyle.PageEditorPlaceHolder}
                                        >
                                            <p>
                                                Trascina qui gli elementi per creare la pagina
                                                <h3>
                                                    <MdAddChart></MdAddChart>
                                                </h3>
                                            </p>
                                        </div>
                                    )}
                                    {pageSections.length != 0 && (
                                        <div className={PageEditorStyle.PageEditorBodyContainer}>
                                            {pageSections &&
                                                pageSections.map((section, index) => {
                                                    console.log("section" + index, section);
                                                    return (
                                                        <div className={PageEditorStyle.PreviewSection}>
                                                            {section.data.map((element) => {
                                                                return (
                                                                    <>
                                                                        {!element.IsDeleted && (
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
                                                                                    {!element.IsDeleted && element.IsSaved && (
                                                                                        <div className={PageEditorStyle.Icon}>
                                                                                            {element.IsActive && <button>Edit</button>}
                                                                                            {!element.IsActive == 1 && (
                                                                                                <div style={{ position: "relative" }}>
                                                                                                    <span
                                                                                                        onClick={() => {
                                                                                                            handleDeleteSavedConfig(element, section);
                                                                                                        }}
                                                                                                        style={{
                                                                                                            fontSize: "1rem",
                                                                                                            position: "absolute",
                                                                                                            right: "5px",
                                                                                                            top: "5px",
                                                                                                            opacity: "0.9",
                                                                                                        }}
                                                                                                    >
                                                                                                        <IoMdCloseCircle></IoMdCloseCircle>
                                                                                                    </span>
                                                                                                    <button
                                                                                                        onClick={() => {
                                                                                                            router.push(
                                                                                                                "/editor/config/" +
                                                                                                                    id +
                                                                                                                    "/" +
                                                                                                                    element.ConfigurationID +
                                                                                                                    "/" +
                                                                                                                    element.Tipo
                                                                                                            );
                                                                                                        }}
                                                                                                    >
                                                                                                        Configure
                                                                                                    </button>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                    {!element.IsDeleted && !element.IsSaved && (
                                                                                        <div className={PageEditorStyle.Icon}>
                                                                                            {element.Tipo == 0 && (
                                                                                                <div style={{ position: "relative" }}>
                                                                                                    <span
                                                                                                        onClick={() => {
                                                                                                            handleDeleteSection(element, section);
                                                                                                        }}
                                                                                                        style={{
                                                                                                            fontSize: "1rem",
                                                                                                            position: "absolute",
                                                                                                            right: "5px",
                                                                                                            top: "5px",
                                                                                                            opacity: "0.9",
                                                                                                        }}
                                                                                                    >
                                                                                                        <IoMdCloseCircle></IoMdCloseCircle>
                                                                                                    </span>
                                                                                                    <BsGraphUp></BsGraphUp>
                                                                                                </div>
                                                                                            )}
                                                                                            {element.Tipo == 1 && (
                                                                                                <div style={{ position: "relative" }}>
                                                                                                    <span
                                                                                                        onClick={() => {
                                                                                                            handleDeleteSection(element, section);
                                                                                                        }}
                                                                                                        style={{
                                                                                                            fontSize: "1rem",
                                                                                                            position: "absolute",
                                                                                                            right: "5px",
                                                                                                            top: "5px",
                                                                                                            opacity: "0.9",
                                                                                                        }}
                                                                                                    >
                                                                                                        <IoMdCloseCircle></IoMdCloseCircle>
                                                                                                    </span>
                                                                                                    <RxSection></RxSection>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )}

                                                                                    <div
                                                                                        onDrop={(e) => {
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
                                                                        )}
                                                                    </>
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
                </>
            )}
        </>
    );
}

const DraggableTypesOfConfig = ({ handleDragStart }) => {
    const [draggableTypes, setDraggableTypes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/types")
            .then((res) => {
                console.log("result", res);
                setDraggableTypes((prev) => {
                    return [...res.data];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={PageEditorStyle.PageEditorHeadeButtonContainer}>
            <div className={PageEditorStyle.PageEditorHeaderDiv}>
                {draggableTypes.map((element, index) => {
                    return (
                        <button
                            draggable
                            onDragStart={(event) =>
                                handleDragStart(event, {
                                    type: element.typeID,
                                    name: element.typeName,
                                })
                            }
                            className={PageEditorStyle.PageEditorHeaderButton}
                        >
                            <IconSelector IconSelector={element.typeName} key={index}></IconSelector>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
