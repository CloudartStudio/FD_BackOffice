import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";

export default function NewPartnerModal({ isOpen, onActionCloseModal }) {
    const HaveMoreLocationsRef = useRef(null);
    const [showMultipleAddresses, setShowMultipleAddresses] = useState(false);

    const handleCheckboxChange = () => {
        // Aggiorna lo stato in base al valore corrente della checkbox
        setShowMultipleAddresses(HaveMoreLocationsRef.current.checked);
    };

    return (
        <>
            {isOpen && (
                <div className={style.ModalContainer}>
                    <div className={style.Modal}>
                        <div className={style.ModalHeader}>
                            <h5>NUOVO COLLABORATORE</h5>
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
                                <label>Campi di specializzazione</label>
                                <br />
                                <input
                                    type={"text"}
                                    placeholder="Campi di specializzazione..."
                                    name="CampiSpec"
                                ></input>
                            </div>
                            <div className={style.FullModalFieldSection}>
                                <h3>Note</h3>
                                <br />
                                <textarea cols={150} rows={10}></textarea>
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
                            porta aziende? check box, se è referral
                        </div>
                        <div className={style.ModalFoot}>
                            <button className={style.Success}>INVIA</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
