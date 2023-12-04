import style from "../../styles/modal.module.css";
import IconSelector from "../IconSelector";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import RoleOptions from "../misc/role_options";
import TypeOptions from "../misc/type_options";

export default function SectionManager({ isOpen, onActionCloseModal, startingSection, saveNewSections }) {
    const [Sections, setSections] = useState([]);
    const [SelectedSection, setSelectedSection] = useState(startingSection);
    const [InfoPanel, setInfoPanel] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/dynamicSections")
            .then((res) => {
                setSections(res.data);
            })
            .catch((err) => {});
    }, []);

    const handleSubmit = () => {
        saveNewSections(SelectedSection);
        onActionCloseModal();
    };

    const handleClose = () => {
        onActionCloseModal();
    };

    return (
        <>
            {isOpen && (
                <div className={style.Modal}>
                    <div className={style.ModalHeader}>
                        <h5>EDITOR DELLE SEZIONI</h5>
                        <span onClick={handleClose} className={style.closeBtnModal}>
                            ✖
                        </span>
                    </div>
                    <div className={style.ModalBodySplitted}>
                        <div>
                            <div className={style.SectionSelector}>
                                <div>
                                    <h5>Seleziona le sezioni da modificare</h5>
                                </div>
                                <div className={style.SectionSelectorBody}>
                                    {Sections &&
                                        Sections.map((s) => {
                                            return (
                                                <div className={style.row}>
                                                    <div className={style.action}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedSection((prev) =>
                                                                    prev.find((ss) => s.NomeSezione == ss.NomeSezione)
                                                                        ? prev.filter((e) => e.NomeSezione !== s.NomeSezione)
                                                                        : [...prev, s]
                                                                );
                                                            }}
                                                            className={style.Success}
                                                        >
                                                            {SelectedSection.find((ss) => s.NomeSezione == ss.NomeSezione) ? "➖" : "➕"}
                                                        </button>
                                                    </div>
                                                    <div
                                                        className={style.sectionLabel}
                                                        onClick={() => {
                                                            setInfoPanel(s);
                                                        }}
                                                    >
                                                        {s.NomeSezione}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="InfoPanel">
                            <button
                                onClick={() => {
                                    setInfoPanel({});
                                }}
                            >
                                reset
                            </button>
                            {InfoPanel && (
                                <button
                                    onClick={() => {
                                        setInfoPanel({});
                                    }}
                                >
                                    add
                                </button>
                            )}
                            {!InfoPanel && (
                                <button
                                    onClick={() => {
                                        setInfoPanel({});
                                    }}
                                >
                                    edit
                                </button>
                            )}

                            <form onSubmit={(e) => {}}>
                                <div className={style.ModalField}>
                                    <label>Nome sezione</label>
                                    <br />
                                    <input type={"text"} placeholder="Nome..." name="Nome"></input>
                                </div>
                                <div className={style.ModalField}>
                                    <label>VerticalOrder</label>
                                    <br />
                                    <input type={"text"} placeholder="Link..." name="Link"></input>
                                </div>
                                <RoleOptions></RoleOptions>
                                <TypeOptions></TypeOptions>
                            </form>
                        </div>
                    </div>

                    <div className={style.ModalFoot}>
                        <button onClick={handleClose} className={style.Delete}>
                            Annulla
                        </button>
                        <button onClick={handleSubmit} className={style.Success}>
                            Conferma
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
