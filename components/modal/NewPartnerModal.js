import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function NewPartnerModal({ isOpen, onActionCloseModal }) {
    const HaveMoreLocationsRef = useRef(null);
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

    const handleOnChangeForm = (e) => {
        setNewPartner({ ...newPartner, [e.target.name]: e.target.value });
    };

    const { data: _session, status } = useSession();

    const submitForm = () => {
        try {
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
                    alert("oke");
                });
        } catch (err) {
            console.log(err);
            alert("error: sei tu!");
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
                    </div>
                    <div className={style.ModalBody}>
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
                        </div>

                        {/* telefono */}
                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input type={"text"} placeholder="Telefono..." name="telefono" onChange={handleOnChangeForm} value={newPartner.telefono}></input>
                        </div>
                        {/* telefono */}
                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input type={"text"} placeholder="Telefono..." name="telefono" onChange={handleOnChangeForm} value={newPartner.telefono}></input>
                        </div>

                        {/* cellulare */}
                        <div className={style.ModalField}>
                            <label>Cellulare</label>
                            <br />
                            <input type={"text"} placeholder="Cellulare..." name="cellulare" onChange={handleOnChangeForm} value={newPartner.cellulare}></input>
                        </div>
                        {/* cellulare */}
                        <div className={style.ModalField}>
                            <label>Cellulare</label>
                            <br />
                            <input type={"text"} placeholder="Cellulare..." name="cellulare" onChange={handleOnChangeForm} value={newPartner.cellulare}></input>
                        </div>

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
                        </div>
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
                        </div>

                        {/* pec */}
                        <div className={style.ModalField}>
                            <label>PEC</label>
                            <br />
                            <input type={"text"} placeholder="PEC..." name="pec" onChange={handleOnChangeForm} value={newPartner.pec}></input>
                        </div>
                        {/* pec */}
                        <div className={style.ModalField}>
                            <label>PEC</label>
                            <br />
                            <input type={"text"} placeholder="PEC..." name="pec" onChange={handleOnChangeForm} value={newPartner.pec}></input>
                        </div>

                        {/* email */}
                        <div className={style.ModalField}>
                            <label>Email</label>
                            <br />
                            <input type={"text"} placeholder="Email..." name="email" onChange={handleOnChangeForm} value={newPartner.email}></input>
                        </div>
                        {/* email */}
                        <div className={style.ModalField}>
                            <label>Email</label>
                            <br />
                            <input type={"text"} placeholder="Email..." name="email" onChange={handleOnChangeForm} value={newPartner.email}></input>
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
                        </div>

                        {/* is_b2b */}
                        <div className={style.ModalField}>
                            <label>Cliente B2B</label>
                            <br />
                            <input type={"checkbox"} placeholder="B2B..." name="is_b2b" onChange={handleOnChangeForm} value={newPartner.is_b2b}></input>
                        </div>
                        {/* is_b2b */}
                        <div className={style.ModalField}>
                            <label>Cliente B2B</label>
                            <br />
                            <input type={"checkbox"} placeholder="B2B..." name="is_b2b" onChange={handleOnChangeForm} value={newPartner.is_b2b}></input>
                        </div>

                        {/* is_b2c */}
                        <div className={style.ModalField}>
                            <label>Cliente B2C</label>
                            <br />
                            <input type={"checkbox"} placeholder="B2C..." name="is_b2c" onChange={handleOnChangeForm} value={newPartner.is_b2c}></input>
                        </div>
                        {/* is_b2c */}
                        <div className={style.ModalField}>
                            <label>Cliente B2C</label>
                            <br />
                            <input type={"checkbox"} placeholder="B2C..." name="is_b2c" onChange={handleOnChangeForm} value={newPartner.is_b2c}></input>
                        </div>

                        {/* nome */}
                        <div className={style.ModalField}>
                            <label>Nome</label>
                            <br />
                            <input type={"text"} placeholder="Nome..." name="nome" onChange={handleOnChangeForm} value={newPartner.nome}></input>
                        </div>
                    </div>
                    {/* nome */}
                    <div className={style.ModalField}>
                        <label>Nome</label>
                        <br />
                        <input type={"text"} placeholder="Nome..." name="nome" onChange={handleOnChangeForm} value={newPartner.nome}></input>
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
