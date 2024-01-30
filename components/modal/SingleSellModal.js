import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2B({ onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [singleSell, setSingleSell] = useState({
    ID_cliente: 0,
    data_vendita: "",
    prezzo: "",
    note: "",
    is_b2b: false,
  });

  const handleOnChangeForm = (e) => {
    setSingleSell({ ...singleSell, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    try {
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
          // TODO: Chiamare notification context
        });
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
          {/* ID_cliente */}
          <div className={style.ModalField}>
            <label>ID Cliente</label>
            <br />
            <input
              type={"text"}
              placeholder="Data Vendita..."
              name="ID_cliente"
              onChange={handleOnChangeForm}
              value={singleSell.ID_cliente}
            ></input>
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
          </div>

          {/* prezzo */}
          <div className={style.ModalField}>
            <label>Prezzo</label>
            <br />
            <input
              type={"text"}
              placeholder="Pre..."
              name="prezzo"
              onChange={handleOnChangeForm}
              value={singleSell.prezzo}
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
              value={singleSell.note}
            ></input>
          </div>

          {/* is_b2b */}
          <div className={style.ModalField}>
            <label>Cliente B2B</label>
            <br />
            <input
              type={"checkbox"}
              placeholder="Telefono..."
              name="is_b2b"
              onChange={handleOnChangeForm}
              value={singleSell.is_b2b}
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
