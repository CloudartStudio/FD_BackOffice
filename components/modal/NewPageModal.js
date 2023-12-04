import style from "../../styles/modal.module.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import IconSelector from "../IconSelector";
import axios from "axios";
import Link from "next/link";
import NotificationContext from "../../context/notificationContext";
import SectionManager from "./SectionManager";
import RoleOptions from "../misc/role_options";

export default function NewPartnerModal({ isOpen, onActionCloseModal, id = null }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [showSectionEditor, setSectionEditor] = useState(false);
    const [isInEdit, setIsInEdit] = useState(false);
    const [Page, setPage] = useState({
        PageName: "",
        Link: "",
        MinRole: "",
        Sections: [],
    });

    const NotificationCtx = useContext(NotificationContext);

    const handleOpenSectionEditor = () => {
        setSectionEditor(true);
        setPageIndex(1);
    };

    const handleCloseSectionEditor = () => {
        setSectionEditor(false);
        setPageIndex(0);
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

    const handleAddnewSection = () => {
        const SectionName = SectionName_input.current.value;
        const VerticalOrder = VerticalOrder_input.current.value;
        const Type = Type_input.current.value;

        if (SectionName && VerticalOrder && Type) {
            const newSection = {
                NomeSezione: SectionName,
                VerticalOrder: VerticalOrder,
                Tipo: Type,
            };

            // Utilizza lo spread operator per creare una nuova copia dell'array
            const newPageSections = [...pageSections, newSection];

            // Imposta il nuovo stato
            setPageSections(newPageSections);
        }
    };

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
                    {" "}
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
                                    <button
                                        style={{
                                            backgroundColor: "#ffffff2f",
                                            border: "1px solid white",
                                            color: "white",
                                            padding: "10px 15px",
                                            borderRadius: "5px",
                                            fontSize: "1rem",
                                            width: "90%",
                                            margin: "0 auto",
                                        }}
                                        onClick={handleOpenSectionEditor}
                                    >
                                        EDIT SECTIONS
                                    </button>
                                </div>
                                {Page.Sections && (
                                    <>
                                        <h4 style={{ color: "white" }}>Sections</h4>
                                        {Page.Sections.map((s) => (
                                            <div>Name : {s.NomeSezione}</div>
                                        ))}
                                    </>
                                )}
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
            {pageIndex === 1 && (
                <>
                    {" "}
                    {isOpen && (
                        <SectionManager
                            saveNewSections={(sections) => {
                                console.log("sections", sections);
                                setPage((prev) => {
                                    return { ...prev, Sections: sections };
                                });
                            }}
                            startingSection={Page.Sections}
                            isOpen={showSectionEditor}
                            onActionCloseModal={handleCloseSectionEditor}
                        ></SectionManager>
                    )}
                </>
            )}
        </>
    );
}

function AddSection({ handleAddnewSection, SectionName_input, VerticalOrder_input, Type_input, pageSections, setPageSections, isInEdit }) {
    return (
        <div className={style.FullModalFieldSection}>
            <label>Sections of the page</label>
            <hr />
            {/*PER AGGIUNGERE*/}
            <div className={style.SectionLine}>
                <div className={style.Cell}>
                    <p className={style.SectionCell}>
                        <label>Nome sezione</label>
                        <br></br>
                        <input ref={SectionName_input} type="text"></input>
                    </p>
                </div>
                <div className={style.Cell}>
                    <p className={style.SectionCell}>
                        <label>Vertical order</label>
                        <br></br>
                        <input ref={VerticalOrder_input} type="number"></input>
                    </p>
                    {/*
                                        <div>Vertical order popup</div> */}
                </div>
                <div className={style.Cell}>
                    <p className={style.SectionCell}>
                        <label>Tipo -TODO:Select</label>
                        <br></br>
                        <input ref={Type_input} type="number"></input>
                    </p>

                    {/*
                                        <div>Tipo popup</div> */}
                </div>
                <div className={style.IconCell}>
                    <p>
                        <button onClick={handleAddnewSection}>
                            <IconSelector IconSelector={"add"}></IconSelector>
                        </button>
                    </p>
                </div>
            </div>

            {/*DA CICLARE - ESISTENTI/EDIT*/}
            {pageSections &&
                pageSections.map((section, index) => {
                    if (section)
                        return (
                            <div className={style.SectionLine}>
                                <div className={style.Cell}>
                                    <p className={style.SectionCell}>{section.NomeSezione}</p>
                                </div>
                                <div className={style.Cell}>
                                    <p className={style.SectionCell}>
                                        {section.VerticalOrder}
                                        <span>
                                            <IconSelector IconSelector={"info"}></IconSelector>
                                        </span>
                                    </p>
                                    {/*
                                        <div>Vertical order popup</div> */}
                                </div>
                                <div className={style.Cell}>
                                    <p className={style.SectionCell}>
                                        {section.Tipo}
                                        <IconSelector IconSelector={"info"}></IconSelector>
                                    </p>

                                    {/*
                                        <div>Tipo popup</div> */}
                                </div>
                                {isInEdit && (
                                    <>
                                        <div className={style.IconCell}>
                                            <p>
                                                <button>
                                                    <IconSelector IconSelector={"edit"}></IconSelector>
                                                </button>
                                            </p>
                                        </div>
                                        <div className={style.IconCell}>
                                            <p>
                                                <button>
                                                    <Link href={"/sections_editor/" + section._id}>
                                                        <IconSelector IconSelector={"section"}></IconSelector>
                                                    </Link>
                                                </button>
                                            </p>
                                        </div>
                                    </>
                                )}
                                <div className={style.IconCell}>
                                    <p>
                                        <button
                                            onClick={() => {
                                                const newPageSections = pageSections.map((s) => {
                                                    if (s !== section) {
                                                        return s;
                                                    }
                                                });

                                                setPageSections([...newPageSections]);
                                            }}
                                        >
                                            <IconSelector IconSelector={"remove"}></IconSelector>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        );
                })}
        </div>
    );
}
