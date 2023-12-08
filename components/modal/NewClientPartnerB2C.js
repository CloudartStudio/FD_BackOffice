import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2C({ isOpen, onActionCloseModal }) {
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
            <h5>NUOVO Client Partner B2C</h5>
            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
              ✖
            </span>
          </div>

          <div className={style.ModalBody}>
            {/* nome */}
            <div className={style.ModalField}>
              <label>Nome</label>
              <br />
              <input type={"text"} placeholder="Nome..." name="nome"></input>
            </div>

            {/* cognome */}
            <div className={style.ModalField}>
              <label>Cognome</label>
              <br />
              <input type={"text"} placeholder="Cognome..." name="cognome"></input>
            </div>

            {/* data_nascita */}
            <div className={style.ModalField}>
              <label>Data Di Nascita</label>
              <br />
              <input type={"date"} placeholder="Data Di Nascita..." name="data_nascita"></input>
            </div>

            {/* telefono */}
            <div className={style.ModalField}>
              <label>Telefono</label>
              <br />
              <input type={"text"} placeholder="Telefono..." name="telefono"></input>
            </div>

            {/* sesso */}
            <div className={style.ModalField}>
              <label>Sesso</label>
              <br />
              <input type={"checkbox"} placeholder="Sesso..." name="is_maschio"></input>
            </div>

            {/* email */}
            <div className={style.ModalField}>
              <label>Email</label>
              <br />
              <input type={"text"} placeholder="Email..." name="email"></input>
            </div>

            {/* indirizzo */}
            <div className={style.ModalField}>
              <label>Indirizzo</label>
              <br />
              <input type={"text"} placeholder="Indirizzo..." name="indirizzo"></input>
            </div>

            {/* custom_data */}
            <div className={style.ModalField}>
              <label>Campi Personalizzati</label>
              <br />
              <input type={"text"} placeholder="Indirizzo..." name="custom_data"></input>
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
