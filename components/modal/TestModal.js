import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function TestModal({ isOpen, onActionCloseModal }) {
  const HaveMoreLocationsRef = useRef(null);
  const [clientB2c, setClientB2c] = useState({
    ID_partner: 0,
    
  });

  const validate = (values) => {
    const errors = {};
    alert('verifica in corso . . .')
    // Esempio di validazione per un campo obbligatorio
    if (!values.ID_partner) {
      errors.ID_partner = 'Il campo nome è obbligatorio';
    }
  
    // Aggiungi altre regole di validazione per gli altri campi
  
    return errors;
  };

  const handleOnChangeForm = (e) => {
    setClientB2c({ ...clientB2c, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    alert('ciao');
  };

  return (
    <>
      {isOpen && (  
        <Formik
          validate={validate}  // Passa la funzione di validazione
          onSubmit={submitForm}  // Passa la funzione di gestione dell'invio
        >
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

            </div>

            <div className={style.ModalFoot}>
              <input
                className={style.Success}
                type={"submit"}
                value={"INVIA"}
              />
                
              
            </div>
          </div>
        </Formik>
      )}
    </>
  );
}
