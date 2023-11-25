import style from "../../styles/modal.module.css";
import React, { useState, useEffect, useRef } from "react";
import IconSelector from "../IconSelector";
import axios from "axios";
import Link from "next/link";

export default function NewPageModal({ isOpen, onActionCloseModal, id = null }) {
    //variabili di aggiunta sezioni
    const SectionName_input = useRef(null);
    const VerticalOrder_input = useRef(null);
    const Type_input = useRef(null);

    //variabili di aggiunta pagina
    const PageName_input = useRef(null);
    const Link_input = useRef(null); //No white space and some rules (no .)
    const MinRole_input = useRef(null);

    const [pageSections, setPageSections] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    const [isInEdit, setIsInEdit] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            if (id && isOpen) {
                setIsInEdit(true);
                const resposePage = await axios.get("http://localhost:3000/api/dynamicPage/" + id);
                const { Nome, Link, RelatedSections, MinRole } = resposePage.data;

                PageName_input.current.value = Nome;
                Link_input.current.value = Link;
                MinRole_input.current.value = MinRole;

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
        const MinRole = MinRole_input.current.value;

        if (PageName && Link && MinRole) {
            const PageObj = {
                ID: id,
                Nome: PageName_input.current.value,
                Link: Link_input.current.value,
                MinRole: MinRole_input.current.value,
                RelatedSections: pageSections,
            };

            console.log("PageObj", PageObj);

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
        }
    };

    return (
        <>
            {isOpen && (
                <div className={style.ModalContainer}>
                    <div className={style.Modal}>
                        <div className={style.ModalHeader}>
                            {!isInEdit && <h5>NUOVA PAGINA</h5>}
                            {isInEdit && (
                                <h5>
                                    MODIFICA PAGINA
                                    {PageName_input && PageName_input.current && PageName_input.current.value ? " - " + PageName_input.current.value : ""}
                                </h5>
                            )}
                            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
                                ✖
                            </span>
                        </div>
                        <div className={style.ModalBody}>
                            {/* {showPopUp && (
                                <PopupSimple
                                    IconSelector={""}
                                    Status={PopUpStatus.popup_status_ok()}
                                    additionalInfo={
                                        "Il salvataggio è andato a buon fine"
                                    }
                                    key={0}
                                ></PopupSimple>
                            )} */}

                            <div className={style.ModalField}>
                                <label>Nome</label>
                                <br />
                                <input ref={PageName_input} type={"text"} placeholder="Nome..." name="Nome"></input>
                            </div>
                            <div className={style.ModalField}>
                                <label>Link</label>
                                <br />
                                <input ref={Link_input} type={"text"} placeholder="Link..." name="Link"></input>
                            </div>
                            <div className={style.ModalField}>
                                <label>Role - todo: select con ruoli</label>
                                <br />
                                <input ref={MinRole_input} type={"number"} placeholder="Role..." name="MinRole"></input>
                            </div>
                            {pageSections && (
                                <>
                                    <p>CIAO</p>
                                    <AddSection
                                        SectionName_input={SectionName_input}
                                        Type_input={Type_input}
                                        VerticalOrder_input={VerticalOrder_input}
                                        handleAddnewSection={handleAddnewSection}
                                        pageSections={pageSections}
                                        setPageSections={setPageSections}
                                        isInEdit={isInEdit}
                                    ></AddSection>
                                </>
                            )}
                        </div>
                        <div className={style.ModalFoot}>
                            <button onClick={handleSavePage} className={style.Success}>
                                INVIA
                            </button>
                        </div>
                    </div>
                </div>
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
                    console.log("pageSections", pageSections);
                    console.log("section " + index, section);
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
