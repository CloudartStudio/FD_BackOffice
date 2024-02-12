import style from "../../styles/modal.module.css";
import NotificationContext from "../../context/notificationContext";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Toggle from "../../components/misc/toggle";

export default function NewPartnerModal({ onActionCloseModal }) {
    const [newPartner, setNewPartner] = useState({
        ragione_sociale: "",
        partita_iva: "",
        codice_sdi: "",
        telefono: "",
        cellulare: "",
        indirizzo_sede_fisica: "",
        indirizzo_sede_legale: "",
        settore_merceologico: "",
        pec: "",
        email: "",
        numero_dipendenti: "",
        is_b2b: false,
        is_b2c: false,
        nome: "",
    });

    const NotificationCtx = useContext(NotificationContext);

    const conf = [
        {
            nome: "ragione_sociale",
            expression: /^[a-z0-9 ]+$/i,
        },
        {
            nome: "partita_iva",
            expression: /^[0-9]+$/i,
            MaxLen: 11,
        },
        {
            nome: "codice_sdi",
            expression: /^[a-z0-9]+$/i,
            MaxLen: 7,
        },
        {
            nome: "telefono",
            expression: /^[0-9]+$/,
            MaxLen: 9,
        },
        {
            nome: "cellulare",
            expression: /^[0-9]+$/,
            MaxLen: 10,
        },
        {
            nome: "indirizzo_sede_fisica",
            expression: /^[a-z0-9,. ]+$/i,
        },
        {
            nome: "indirizzo_sede_legale",
            expression: /^[a-z0-9,. ]+$/i,
        },
        {
            nome: "settore_merceologico",
            expression: /^[0-9]+$/,
        },
        {
            nome: "pec",
            expression: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        },
        {
            nome: "email",
            expression: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        },
        {
            nome: "numero_dipendenti",
            expression: /^[0-9]+$/,
        },
        {
            nome: "nome",
            expression: /^[a-z ]+$/i,
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
                handleErrors(name, `Il Campo ${name} è obbligatorio!`);
                if (isFinal) {
                    //IL VALORE É NULLO QUINDI NON CE IL VALORE, L'UTENTE DEVE INSERIRLO
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
            setNewPartner({ ...newPartner, [e.target.name]: e.target.value });
        }
    };

    const submitForm = () => {
        try {
            let isValid = true;
            Object.keys(newPartner).forEach((item) => {
                if (!handleValidationOnChange({ name: item, value: newPartner[item] }, true)) {
                    alert(item);
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
                    .post("http://localhost:3000/api/auth/account/partner", {
                        ragione_sociale: newPartner.ragione_sociale,
                        partita_iva: newPartner.partita_iva,
                        codice_sdi: newPartner.codice_sdi,
                        telefono: newPartner.telefono,
                        cellulare: newPartner.cellulare,
                        indirizzo_sede_fisica: newPartner.indirizzo_sede_fisica,
                        indirizzo_sede_legale: newPartner.indirizzo_sede_legale,
                        settore_merceologico: newPartner.settore_merceologico,
                        pec: newPartner.pec,
                        email: newPartner.email,
                        numero_dipendenti: newPartner.numero_dipendenti,
                        is_b2b: newPartner.is_b2b,
                        is_b2c: newPartner.is_b2c,
                        nome: newPartner.nome,
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
                    <h5>NUOVO PARTNER</h5>
                    <span onClick={onActionCloseModal} className={style.closeBtnModal}>
                        ✖
                    </span>
                </div>

                <div className={style.ModalBody}>
                    <div className={style.ModalBodyLabelContainer}>
                        {/* nome */}
                        <div className={style.ModalField}>
                            <label>Nome</label>
                            <br />
                            <input type={"text"} placeholder="Nome..." name="nome" onChange={handleOnChangeForm} value={newPartner.nome}></input>
                            {errors.nome && <p className={style.error}>{errors.nome}</p>}
                        </div>

                        {/* telefono */}
                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input type={"text"} placeholder="Telefono..." name="telefono" onChange={handleOnChangeForm} value={newPartner.telefono}></input>
                            {errors.telefono && <p className={style.error}>{errors.telefono}</p>}
                        </div>

                        {/* cellulare */}
                        <div className={style.ModalField}>
                            <label>Cellulare</label>
                            <br />
                            <input type={"text"} placeholder="Cellulare..." name="cellulare" onChange={handleOnChangeForm} value={newPartner.cellulare}></input>
                            {errors.cellulare && <p className={style.error}>{errors.cellulare}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* ragione_sociale */}
                        <div className={style.ModalField}>
                            <label>Ragione Sociale</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Ragione Sociale..."
                                name="ragione_sociale"
                                onChange={handleOnChangeForm}
                                value={newPartner.ragione_sociale}
                            ></input>
                            {errors.ragione_sociale && <p className={style.error}>{errors.ragione_sociale}</p>}
                        </div>

                        {/* partita_iva */}
                        <div className={style.ModalField}>
                            <label>Partita IVA</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Partita IVA..."
                                name="partita_iva"
                                onChange={handleOnChangeForm}
                                value={newPartner.partita_iva}
                            ></input>
                            {errors.partita_iva && <p className={style.error}>{errors.partita_iva}</p>}
                        </div>

                        {/* codice_sdi */}
                        <div className={style.ModalField}>
                            <label>Codice SDI</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Codice SDI..."
                                name="codice_sdi"
                                onChange={handleOnChangeForm}
                                value={newPartner.codice_sdi}
                            ></input>
                            {errors.codice_sdi && <p className={style.error}>{errors.codice_sdi}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* indirizzo_sede_fisica */}
                        <div className={style.ModalField}>
                            <label>Indirizzo Sede Fisica</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Indirizzo Sede Fisica..."
                                name="indirizzo_sede_fisica"
                                onChange={handleOnChangeForm}
                                value={newPartner.indirizzo_sede_fisica}
                            ></input>
                            {errors.indirizzo_sede_fisica && <p className={style.error}>{errors.indirizzo_sede_fisica}</p>}
                        </div>

                        {/* indirizzo_sede_legale */}
                        <div className={style.ModalField}>
                            <label>Indirizzo Sede Legale</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Indirizzo Sede Legale..."
                                name="indirizzo_sede_legale"
                                onChange={handleOnChangeForm}
                                value={newPartner.indirizzo_sede_legale}
                            ></input>
                            {errors.indirizzo_sede_legale && <p className={style.error}>{errors.indirizzo_sede_legale}</p>}
                        </div>

                        {/* settore_merceologico */}
                        <div className={style.ModalField}>
                            <label>Settore Merceologico</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Settore Merceologico..."
                                name="settore_merceologico"
                                onChange={handleOnChangeForm}
                                value={newPartner.settore_merceologico}
                            ></input>
                            {errors.settore_merceologico && <p className={style.error}>{errors.settore_merceologico}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* pec */}
                        <div className={style.ModalField}>
                            <label>PEC</label>
                            <br />
                            <input type={"text"} placeholder="PEC..." name="pec" onChange={handleOnChangeForm} value={newPartner.pec}></input>
                            {errors.pec && <p className={style.error}>{errors.pec}</p>}
                        </div>

                        {/* email */}
                        <div className={style.ModalField}>
                            <label>Email</label>
                            <br />
                            <input type={"text"} placeholder="Email..." name="email" onChange={handleOnChangeForm} value={newPartner.email}></input>
                            {errors.email && <p className={style.error}>{errors.email}</p>}
                        </div>

                        {/* numero_dipendenti */}
                        <div className={style.ModalField}>
                            <label>Numero Dipendenti</label>
                            <br />
                            <input
                                type={"text"}
                                placeholder="Numero Dipendenti..."
                                name="numero_dipendenti"
                                onChange={handleOnChangeForm}
                                value={newPartner.numero_dipendenti}
                            ></input>
                            {errors.numero_dipendenti && <p className={style.error}>{errors.numero_dipendenti}</p>}
                        </div>
                    </div>

                    <div className={style.ModalBodyLabelContainer}>
                        {/* is_b2b */}
                        <div className={style.ModalField}>
                            <Toggle 
                                data={[{label: "B2B"}, {label: "B2C"}]}
                                setStato={() => {handleOnChangeForm({target: {name: "is_b2b", value: !newPartner.is_b2b}})}}
                                stato={newPartner.is_b2b}
                            ><h5 className={style.ModalField} >Tipo Cliente</h5></Toggle>
                        </div>

                        {/* is_b2b */}
                        <div className={style.ModalField}>
                            <Toggle 
                                data={[{label: "B2B"}, {label: "B2C"}]}
                                setStato={() => {handleOnChangeForm({target: {name: "is_b2c", value: !newPartner.is_b2c}})}}
                                stato={newPartner.is_b2c}
                            ><h5 className={style.ModalField} >Tipo Cliente</h5></Toggle>
                        </div>
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
