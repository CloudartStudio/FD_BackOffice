import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2B({ onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [clientB2b, setClientB2b] = useState({
    ID_partner: 0,
    ragione_sociale: "",
    partita_iva: "",
    codice_sdi: "",
    telefono: "",
    cellulare: "",
    indirizzo: "",
    nome: "",
    pec: "",
    email: "",
    indirizzo_sede_fisica: "",
    indirizzo_sede_legale: "",
  });

  const handleOnChangeForm = (e) => {
    setClientB2b({ ...clientB2b, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    try {
      axios
        .post("http://localhost:3000/api/auth/account/cliente/b2b", {
          ID_partner: clientB2b.ID_partner,
          ragione_sociale: clientB2b.ragione_sociale,
          partita_iva: clientB2b.partita_iva,
          codice_sdi: clientB2b.codice_sdi,
          telefono: clientB2b.telefono,
          cellulare: clientB2b.cellulare,
          indirizzo: clientB2b.indirizzo,
          nome: clientB2b.nome,
          pec: clientB2b.pec,
          email: clientB2b.email,
          indirizzo_sede_fisica: clientB2b.indirizzo_sede_fisica,
          indirizzo_sede_legale: clientB2b.indirizzo_sede_legale,
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
          <h5>NUOVO CLIENTE PARTNER B2B</h5>
          <span onClick={onActionCloseModal} className={style.closeBtnModal}>
            ✖
          </span>
        </div>

        <div className={style.ModalBody}>
          {/* ID_partner */}
          <div className={style.ModalField}>
            <label>ID Partner</label>
            <br />
            <input
              type={"text"}
              placeholder="ID Partner..."
              name="ID_partner"
              onChange={handleOnChangeForm}
              value={clientB2b.ID_partner}
            ></input>
          </div>

          {/* ragione_sociale */}
          <div className={style.ModalField}>
            <label>Ragione Sociale</label>
            <br />
            <input
              type={"text"}
              placeholder="Ragione Sociale..."
              name="ragione_sociale"
              onChange={handleOnChangeForm}
              value={clientB2b.ragione_sociale}
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
              value={clientB2b.partita_iva}
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
              value={clientB2b.codice_sdi}
            ></input>
          </div>

          {/* telefono */}
          <div className={style.ModalField}>
            <label>Telefono</label>
            <br />
            <input
              type={"text"}
              placeholder="Telefono..."
              name="telefono"
              onChange={handleOnChangeForm}
              value={clientB2b.telefono}
            ></input>
          </div>

          {/* cellulare */}
          <div className={style.ModalField}>
            <label>Cellulare</label>
            <br />
            <input
              type={"text"}
              placeholder="Cellulare..."
              name="cellulare"
              onChange={handleOnChangeForm}
              value={clientB2b.cellulare}
            ></input>
          </div>

          {/* indirizzo */}
          <div className={style.ModalField}>
            <label>Indirizzo</label>
            <br />
            <input
              type={"text"}
              placeholder="Indirizzo..."
              name="indirizzo"
              onChange={handleOnChangeForm}
              value={clientB2b.indirizzo}
            ></input>
          </div>

          {/* nome */}
          <div className={style.ModalField}>
            <label>Nome</label>
            <br />
            <input
              type={"text"}
              placeholder="Nome..."
              name="nome"
              onChange={handleOnChangeForm}
              value={clientB2b.nome}
            ></input>
          </div>

          {/* pec */}
          <div className={style.ModalField}>
            <label>PEC</label>
            <br />
            <input
              type={"text"}
              placeholder="PEC..."
              name="pec"
              onChange={handleOnChangeForm}
              value={clientB2b.pec}
            ></input>
          </div>

          {/* email */}
          <div className={style.ModalField}>
            <label>Email</label>
            <br />
            <input
              type={"text"}
              placeholder="Email..."
              name="email"
              onChange={handleOnChangeForm}
              value={clientB2b.email}
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
              value={clientB2b.indirizzo_sede_fisica}
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
              value={clientB2b.indirizzo_sede_legale}
            ></input>
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
