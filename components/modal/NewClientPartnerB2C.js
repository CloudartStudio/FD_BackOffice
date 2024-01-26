import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2C({ isOpen, onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [clientB2c, setClientB2c] = useState({
    ID_partner: 0,
    nome: "",
    cognome: "",
    data_nascita: "",
    telefono: "",
    is_maschio: false,
    email: "",
    indirizzo: "",
    custom_data: "",
  });

  const handleOnChangeForm = (e) => {
    setClientB2c({ ...clientB2c, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    try {
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
          alert("oke");
        });
    } catch (err) {
      console.log(err);
      alert("erroe: sei tu!");
    }
  };

  return (
    <>
      {isOpen && (
        <div className={style.Modal}>
          <div className={style.ModalHeader}>
            <h5>NUOVO CLIENT PARTNER B2C</h5>
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
                value={clientB2c.ID_partner}
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
                value={clientB2c.nome}
              ></input>
            </div>

            {/* cognome */}
            <div className={style.ModalField}>
              <label>Cognome</label>
              <br />
              <input
                type={"text"}
                placeholder="Cognome..."
                name="cognome"
                onChange={handleOnChangeForm}
                value={clientB2c.cognome}
              ></input>
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
                value={clientB2c.telefono}
              ></input>
            </div>

            {/* sesso */}
            <div className={style.ModalField}>
              <label>Sesso</label>
              <br />
              <input
                type={"checkbox"}
                placeholder="Sesso..."
                name="is_maschio"
                onChange={handleOnChangeForm}
                value={clientB2c.sesso}
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
                value={clientB2c.email}
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
                value={clientB2c.indirizzo}
              ></input>
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
            </div>

            
          </div>

          <div className={style.ModalFoot}>
            <button 
              className={style.Success}
              onClick={() => {
                submitForm()
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
