import style from "../../styles/modal.module.css";
import NotificationContext from "../../context/notificationContext";
import React, { useState, useContext } from "react";
import axios from "axios";

export default function NewClientPartnerB2C({ isOpen, onActionCloseModal }) {
    const [clientB2c, setClientB2c] = useState({
        ID_partner: null,
        nome: "",
        cognome: "",
        data_nascita: "",
        telefono: "",
        is_maschio: false,
        email: "",
        indirizzo: "",
        custom_data: "",
    });

    const NotificationCtx = useContext(NotificationContext);

    const conf = [
        {
            nome: "ID_partner",
            expression: /^[0-9]+$/,
        },
        {
            nome: "nome",
            expression: /^[a-z ]+$/i,
        },
        {
            nome: "cognome",
            expression: /^[a-z ]+$/i,
        },
        {
            nome: "data_nascita",
            expression: /^.+$/,
        },
        {
            nome: "telefono",
            expression: /^[0-9]+$/,
            MaxLen: 9,
        },
        {
            nome: "email",
            expression: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        },
        {
            nome: "indirizzo",
            expression: /^[a-z0-9 ]+$/i,
        },
        {
            nome: "custom_data",
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
                if (conf[c].MaxLen) {
                    if (value.length > conf[c].MaxLen) {
                        handleErrors(name, `la lunghezza di ${name} supera la lunghezza consentita`); //numeri di telefono,codice sdi,p iva
                        if (isFinal) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }

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
            setClientB2c({ ...clientB2c, [e.target.name]: e.target.value });
        }
    };

    const submitForm = () => {
        try {
            let isValid = true;
            Object.keys(clientB2c).forEach((item) => {
                if (!handleValidationOnChange({ name: item, value: clientB2c[item] }, true)) {
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
                    .post("http://localhost:3000/api/auth/account/cliente/b2c", {
                        ID_partner: clientB2c.ID_partner,
                        nome: clientB2c.nome,
                        cognome: clientB2c.cognome,
                        data_nascita: clientB2c.data_nascita,
                        telefono: clientB2c.telefono,
                        is_maschio: clientB2c.is_maschio,
                        email: clientB2c.email,
                        indirizzo: clientB2c.indirizzo,
                        custom_data: clientB2c.custom_data,
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
                    <h5>NUOVO CLIENT PARTNER B2C</h5>
                    <span onClick={onActionCloseModal} className={style.closeBtnModal}>
                        ✖
                    </span>
                </div>

                <div className={style.ModalBody}>
                    <div className={style.ModalBodyLabelContainer}>
                        {/* ID_partner */}
                        <div className={style.ModalField}>
                            <label>ID Partner</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="ID Partner..."
                                name="ID_partner"
                                onChange={handleOnChangeForm}
                                value={clientB2c.ID_partner}
                            ></input>
                            {/* visualizzatore dell'errore */}
                            {errors.ID_partner && <p className={style.error}>{errors.ID_partner}</p>}
                        </div>

                        {/* nome */}
                        <div className={style.ModalField}>
                            <label>Nome</label>
                            <br />
                            <input type={"text"} placeholder="Nome..." name="nome" onChange={handleOnChangeForm} value={clientB2c.nome}></input>
                            {/* visualizzatore dell'errore */}
                            {errors.nome && <p className={style.error}>{errors.nome}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* cognome */}
                        <div className={style.ModalField}>
                            <label>Cognome</label>
                            <br />
                            <input type={"text"} placeholder="Cognome..." name="cognome" onChange={handleOnChangeForm} value={clientB2c.cognome}></input>
                            {errors.cognome && <p className={style.error}>{errors.cognome}</p>}
                        </div>

                        {/* data_nascita */}
                        <div className={style.ModalField}>
                            <label>Data Di Nascita</label>
                            <br />
                            <input
                                type={"date"}
                                placeholder="Data Di Nascita..."
                                name="data_nascita"
                                onChange={handleOnChangeForm}
                                value={clientB2c.data_nascita}
                            ></input>
                            {errors.data_nascita && <p className={style.error}>{errors.data_nascita}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* telefono */}
                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input type={"text"} placeholder="Telefono..." name="telefono" onChange={handleOnChangeForm} value={clientB2c.telefono}></input>
                            {errors.telefono && <p className={style.error}>{errors.telefono}</p>}
                        </div>

                        {/* email */}
                        <div className={style.ModalField}>
                            <label>Email</label>
                            <br />
                            <input type={"text"} placeholder="Email..." name="email" onChange={handleOnChangeForm} value={clientB2c.email}></input>
                            {errors.email && <p className={style.error}>{errors.email}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* indirizzo */}
                        <div className={style.ModalField}>
                            <label>Indirizzo</label>
                            <br />
                            <input type={"text"} placeholder="Indirizzo..." name="indirizzo" onChange={handleOnChangeForm} value={clientB2c.indirizzo}></input>
                            {errors.indirizzo && <p className={style.error}>{errors.indirizzo}</p>}
                        </div>

                        {/* custom_data */}
                        <div className={style.ModalField}>
                            <label>Custom Data</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Custom Data..."
                                name="custom_data"
                                onChange={handleOnChangeForm}
                                value={clientB2c.custom_data}
                            ></input>
                            {errors.custom_data && <p className={style.error}>{errors.custom_data}</p>}
                        </div>
                    </div>

                    {/* is_maschio */}
                    <div className={style.ModalField}>
                        <label>Sesso</label>
                        <br />
                        <input type={"checkbox"} placeholder="Sesso..." name="is_maschio" onChange={handleOnChangeForm} value={clientB2c.is_maschio}></input>
                        {errors.is_maschio && <p className={style.error}>{errors.is_maschio}</p>}
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
            )}
        </>
    );
}
