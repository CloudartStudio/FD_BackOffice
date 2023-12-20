import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2B({ isOpen, onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [showMultipleAddresses, setShowMultipleAddresses] = useState(false);

  const handleCheckboxChange = () => {
    // Aggiorna lo stato in base al valore corrente della checkbox
    setShowMultipleAddresses(HaveMoreLocationsRef.current.checked);
  };

  const submitForm = () => {
    try {
      axios
        .post("http://localhost:3000/api/query/SimpleSelect", {
          ConfigID: visualizerData._id,
        })
        .then((result) => {
          // TODO: Chiamare notification context
        });
    } catch (err) {
      //TODO: LOGGER
    }
  };

  return (
    <>
      {isOpen && (
        <form onSubmit={submitForm} className={style.Modal}>
          <div className={style.ModalHeader}>
            <h5>NUOVO Client Partner B2B</h5>
            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
              ✖ 
            </span>
          </div>

          <div className={style.ModalBody}>
            {/* ragione sociale */}
            <div className={style.ModalField}>
              <label>Ragione Sociale</label>
              <br />
              <input type={"text"} placeholder="Ragione Sociale..." name="ragione_sociale"></input>
            </div>

            {/* partita_iva */}
            <div className={style.ModalField}>
              <label>Partita Iva</label>
              <br />
              <input type={"text"} placeholder="Partita Iva..." name="partita_iva"></input>
            </div>

            {/* codice_sdi */}
            <div className={style.ModalField}>
              <label>Codice SDI</label>
              <br />
              <input type={"text"} placeholder="Codice SDI..." name="codice_sdi"></input>
            </div>

            {/* telefono */}
            <div className={style.ModalField}>
              <label>Telefono</label>
              <br />
              <input type={"text"} placeholder="Telefono..." name="telefono"></input>
            </div>

            {/* cellulare */}
            <div className={style.ModalField}>
              <label>Cellulare</label>
              <br />
              <input type={"text"} placeholder="Cellulare..." name="cellulare"></input>
            </div>

            {/* indirizzo */}
            <div className={style.ModalField}>
              <label>Indirizzo</label>
              <br />
              <input type={"text"} placeholder="Indirizzo..." name="indirizzo"></input>
            </div>

            {/* nome */}
            <div className={style.ModalField}>
              <label>Nome</label>
              <br />
              <input type={"text"} placeholder="Nome..." name="nome"></input>
            </div>

            {/* pec */}
            <div className={style.ModalField}>
              <label>PEC</label>
              <br />
              <input type={"text"} placeholder="PEC..." name="pec"></input>
            </div>
            
            {/* email */}
            <div className={style.ModalField}>
              <label>Email</label>
              <br />
              <input type={"text"} placeholder="Email..." name="email"></input>
            </div>
            
            {/* indirizzo_sede_fiscale */}
            <div className={style.ModalField}>
              <label>Sede Fiscale</label>
              <br />
              <input type={"text"} placeholder="Sede Fiscale..." name="indirizzo_sede_fiscale"></input>
            </div>
            
            {/* indirizzo_sede_legale */}
            <div className={style.ModalField}>
              <label>CAMPI PERSONALIZZATI</label>
              <br />
              <input type={"text"} placeholder="Campi Personalizzati..." name="custom_data"></input>
            </div>
          </div>

          <div className={style.ModalFoot}>
            <button className={style.Success}>INVIA</button>
          </div>
        </form>
      )}
    </>
  );
}
