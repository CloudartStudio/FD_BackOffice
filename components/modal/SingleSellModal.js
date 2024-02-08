import style from "../../styles/modal.module.css";
import NotificationContext from "../../context/notificationContext";
import React, { useState, useContext } from "react";
import axios from "axios";

export default function SingleSellModal({ isOpen, onActionCloseModal }) {
    const [singleSell, setSingleSell] = useState({
        ID_cliente: null,
        data_vendita: "",
        prezzo: "",
        note: "",
        is_b2b: false,
    });

    const NotificationCtx = useContext(NotificationContext);

    const conf = [
        {
            nome: "ID_cliente",
            expression: /^[0-9]+$/,
        },
        {
            nome: "data_vendita",
            expression: /^.+$/,
        },
        {
            nome: "prezzo",
            expression: /^[0-9]+$/,
        },
        {
            nome: "note",
            expression: /^[a-z0-9 ]+$/i,
        },
    ];

    const [errors, setErrors] = useState({});

    const handleErrors = (name, error) => {
        setErrors({ ...errors, [name]: error });
    };

    const checkSimpleValidation = (name, value, isFinal) => {
        const c = conf.findIndex((conf) => conf.nome === name);
        if (c != -1) {
            if (value == "" || value === null || value === undefined) {
                //IL VALORE è NULLO QUINDI NON CE IL VALORE ,LUTENTE DEVE INSRIRLO
                handleErrors(name, `Il Campo ${name} è obbligatorio!`);
                if (isFinal) {
                    return false;
                } else {
                    return true;
                }
            } else {
                //VALORE CE FARE IL CONTROLLO CON L'ESPRESSIONE
                if (!conf[c].expression.test(value)) {
                    handleErrors(name, `Il valore inserito in ${name} non è corretto`);
                    if (isFinal) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    handleErrors(name, null);
                    return true;
                }
            }
        } else {
            handleErrors(name, null);
            return true;
        }
    };

    function handleValidationOnChange(target, isFinal = false) {
        const { name, value } = target;

        const result = checkSimpleValidation(name, value, isFinal);

        return result;
    }

    const handleOnChangeForm = (e) => {
        if (handleValidationOnChange(e.target)) {
            setSingleSell({ ...singleSell, [e.target.name]: e.target.value });
        }
    };

    const submitForm = () => {
        try {
            let isValid = true;
            Object.keys(singleSell).forEach((item) => {
                if (!handleValidationOnChange({ name: item, value: singleSell[item] }, true)) {
                    isValid = false;
                }
            });
            if (isValid) {
                NotificationCtx.showNotification({
                    title: "Attesa",
                    message: "Salvataggio in corso...",
                    status: "waiting",
                });
                axios
                    .post("http://localhost:3000/api/vendite/singola", {
                        ID_partner: 4,
                        ID_cliente: singleSell.ID_cliente,
                        data_vendita: singleSell.data_vendita,
                        prezzo: singleSell.prezzo,
                        note: singleSell.note,
                        is_b2b: singleSell.is_b2b,
                    })
                    .then((result) => {
                        NotificationCtx.showNotification({
                            title: "Salvataggio",
                            message: "Il salvataggio è andato a buon fine",
                            status: "success",
                        });
                        onActionCloseModal();
                    })
                    .catch((error) => {
                        NotificationCtx.showNotification({
                            title: "Errore",
                            message: "Il salvataggio non è andato a buon fine",
                            status: "error",
                        });
                        onActionCloseModal();
                        console.log("error", error);
                    });
            }
        } catch (err) {
            //TODO: LOGGER
            console.log(err);
        }
    };

    return (
        <>
            <div className={style.Modal}>
                <div className={style.ModalHeader}>
                    <h5>NUOVA VENDITA SINGOLA</h5>
                    <span onClick={onActionCloseModal} className={style.closeBtnModal}>
                        ✖
                    </span>
                </div>

                <div className={style.ModalBody}>
                    <div className={style.ModalBodyLabelContainer}>
                        {/* ID_cliente */}
                        <div className={style.ModalField}>
                            <label>ID Cliente</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="ID Cliente..."
                                name="ID_cliente"
                                onChange={handleOnChangeForm}
                                value={singleSell.ID_cliente}
                            ></input>
                            {errors.ID_cliente && <p className={style.error}>{errors.ID_cliente}</p>}
                        </div>
                        {/* data_vendita */}
                        <div className={style.ModalField}>
                            <label>Data Vendita</label>
                            <br />
                            <input
                                type={"date"}
                                placeholder="Data Vendita..."
                                name="data_vendita"
                                onChange={handleOnChangeForm}
                                value={singleSell.data_vendita}
                            ></input>
                            {errors.data_vendita && <p className={style.error}>{errors.data_vendita}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* prezzo */}
                        <div className={style.ModalField}>
                            <label>Prezzo</label>
                            <br />
                            <input type={"text"} placeholder="Prezzo..." name="prezzo" onChange={handleOnChangeForm} value={singleSell.prezzo}></input>
                            {errors.prezzo && <p className={style.error}>{errors.prezzo}</p>}
                        </div>

                        {/* note */}
                        <div className={style.ModalField}>
                            <label>Note</label>
                            <br />
                            <textarea type={"text"} placeholder="Note..." name="note" onChange={handleOnChangeForm} value={singleSell.note}></textarea>
                            {errors.note && <p className={style.error}>{errors.note}</p>}
                        </div>
                    </div>

                    {/* is_b2b */}
                    <div className={style.ModalField}>
                        <label>Cliente B2B</label>
                        <br />
                        <input type={"checkbox"} placeholder="Telefono..." name="is_b2b" onChange={handleOnChangeForm} value={singleSell.is_b2b}></input>
                        {errors.is_b2b && <p className={style.error}>{errors.is_b2b}</p>}
                    </div>
                </div>

                <div className={style.ModalFoot}>
                    <button
                        className={style.Success}
                        onClick={() => {
                            submitForm();
                        }}
                    >
                        INVIA
                    </button>
                </div>
            </div>
        </>
    );
}
