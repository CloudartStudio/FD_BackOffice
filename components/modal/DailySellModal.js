import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2B({ onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [dailySell, setDailySell] = useState({
    data: "",
    totale_incasso: "",
    totale_numero_vendite: "",
    note: "",
  });

  const handleOnChangeForm = (e) => {
    setDailySell({ ...dailySell, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    try {
      axios
        .post("http://localhost:3000/api/vendite/giornaliera", {
          ID_partner: 3,
          data: dailySell.data,
          totale_incasso: dailySell.totale_incasso,
          totale_numero_vendite: dailySell.totale_numero_vendite,
          note: dailySell.note,
        })
        .then((result) => {
          // TODO: Chiamare notification context
          alert("oke");
        });
    } catch (err) {
      //TODO: LOGGER
      console.log(err);
      alert("error: sei tu!");
    }
  };

  return (
    <>
      <div className={style.Modal}>
        <div className={style.ModalHeader}>
          <h5>NUOVA VENDITA GIORNALIERA</h5>
          <span onClick={onActionCloseModal} className={style.closeBtnModal}>
            ✖
          </span>
        </div>

        <div className={style.ModalBody}>
          {/* data */}
          <div className={style.ModalField}>
            <label>Data</label>
            <br />
            <input
              type={"date"}
              placeholder="Data..."
              name="data"
              onChange={handleOnChangeForm}
              value={dailySell.data_vendita}
            ></input>
          </div>

          {/* totale_incasso */}
          <div className={style.ModalField}>
            <label>Totale Incasso</label>
            <br />
            <input
              type={"text"}
              placeholder="Totale Incasso..."
              name="totale_incasso"
              onChange={handleOnChangeForm}
              value={dailySell.totale_incasso}
            ></input>
          </div>

          {/* totale_numero_vendite */}
          <div className={style.ModalField}>
            <label>Totale Numero Vendite</label>
            <br />
            <input
              type={"text"}
              placeholder="Totale Numero Vendite..."
              name="totale_numero_vendite"
              onChange={handleOnChangeForm}
              value={dailySell.totale_numero_vendite}
            ></input>
          </div>

          {/* note */}
          <div className={style.ModalField}>
            <label>Note</label>
            <br />
            <input
              type={"text"}
              placeholder="Note..."
              name="note"
              onChange={handleOnChangeForm}
              value={dailySell.note}
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
