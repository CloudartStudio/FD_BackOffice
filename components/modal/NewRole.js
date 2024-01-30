import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewRole({ onActionCloseModal }) {
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
      <form onSubmit={submitForm} className={style.Modal}>
        <div className={style.ModalHeader}>
          <h5>NUOVO CLIENTE</h5>
          <span onClick={onActionCloseModal} className={style.closeBtnModal}>
            ✖
          </span>
        </div>

        <div className={style.ModalBody}>
          {/* ruolo */}
          <div className={style.ModalField}>
            <label>Ruolo</label>
            <br />
            <input type={"text"} placeholder="Ruolo..." name="ruolo"></input>
          </div>

          {/* descrizione */}
          <div className={style.ModalField}>
            <label>Descrizione</label>
            <br />
            <input
              type={"text"}
              placeholder="Descrizione..."
              name="descrizione"
            ></input>
          </div>
        </div>

        <div className={style.ModalFoot}>
          <button className={style.Success}>INVIA</button>
        </div>
      </form>
    </>
  );
}
