import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";

export default function NewClientModal({ isOpen, onActionCloseModal }) {
    const HaveMoreLocationsRef = useRef(null);
    const [showMultipleAddresses, setShowMultipleAddresses] = useState(false);

    const handleCheckboxChange = () => {
        // Aggiorna lo stato in base al valore corrente della checkbox
        setShowMultipleAddresses(HaveMoreLocationsRef.current.checked);
    };

    return (
        <>
            {isOpen && (
                <div className={style.Modal}>
                    <div className={style.ModalHeader}>
                        <h5>NUOVO CLIENTE</h5>
                        <span
                            onClick={onActionCloseModal}
                            className={style.closeBtnModal}
                        >
                            ✖
                        </span>
                    </div>
                    <div className={style.ModalBody}>
                        <div className={style.ModalField}>
                            <label>Nome</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Nome..."
                                name="Nome"
                            ></input>
                        </div>
                        <div className={style.ModalField}>
                            <label>Conogme</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Conogme..."
                                name="Cognome"
                            ></input>
                        </div>
                        <div className={style.ModalField}>
                            <label>P.Iva</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="P.Iva..."
                                name="P.Iva"
                            ></input>
                        </div>
                        <div className={style.ModalField}>
                            <label>Ragione Sociale</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Ragione Sociale..."
                                name="Ragione Sociale"
                            ></input>
                        </div>
                        <div className={style.ModalField}>
                            <label>PEC</label>
                            <br />
                            <input
                                type={"email"}
                                placeholder="PEC..."
                                name="PEC"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <label>Indirizzo</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Indirizzo..."
                                name="Indirizzo"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input
                                type={"tel"}
                                placeholder="Telefono..."
                                name="Telefono"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <label>SDI</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="SDI..."
                                name="SDI"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <label>Settore Merciologico</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Settore Merciologico..."
                                name="Settore Merciologico"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <label>Serivizi</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Servizi..."
                                name="Servizi"
                            ></input>
                        </div>

                        <div className={style.ModalField}>
                            <div className={style.ModalFieldSection}>
                                <label>Contratto da...</label>
                                <br />
                                <input
                                    type={"date"}
                                    placeholder="Contratto da..."
                                    name="Contratto da..."
                                ></input>
                                <br />

                                <label>a...</label>
                                <br />
                                <input
                                    type={"date"}
                                    placeholder="Contratto a..."
                                    name="a..."
                                ></input>
                            </div>
                        </div>

                        <div className={style.ModalField}>
                            {" "}
                            <div className={style.ModalFieldSection}>
                                <h3>Piu sedi</h3>
                                <input
                                    ref={HaveMoreLocationsRef}
                                    type="checkbox"
                                    placeholder="Piu sedi..."
                                    name="Piu sedi"
                                    onChange={handleCheckboxChange}
                                ></input>
                                <br /> <br />
                                <label>Indirizzo 1</label>
                                <input
                                    type="text"
                                    placeholder="Indirizzo 1..."
                                ></input>
                                <br />
                                <br />
                                {showMultipleAddresses && (
                                    <>
                                        <label>Indirizzo 2</label>
                                        <input
                                            type="text"
                                            placeholder="Indirizzo 2..."
                                        ></input>
                                        <br /> <br />
                                        <label>Indirizzo 3</label>
                                        <input
                                            type="text"
                                            placeholder="Indirizzo 3..."
                                        ></input>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className={style.FullModalFieldSection}>
                            <h3>Carica Documento</h3>
                            <br />
                            <label
                                for="file-upload"
                                className={style.customFileUpload}
                            >
                                Carica
                            </label>
                            <input id="file-upload" type={"file"} />
                        </div>
                    </div>
                    <div className={style.ModalFoot}>
                        <button className={style.Success}>INVIA</button>
                    </div>
                </div>
            )}
        </>
    );
}
