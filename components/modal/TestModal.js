import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";

export default function TestModal({ isOpen, onActionCloseModal }) {
  // Modello dati/dto
  const [clientB2c, setClientB2c] = useState({ ID_partner: null });

  // Oggetto che contiene errori
  const [errors, setErrors] = useState({});

  // Funzione generica (non modificare o morirai!1!1) per gestire
  // la visualizzazione dell'errore in modo semi-automatico
  const handleErrors = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  // Funzione customizzabile in cui vengono inseriti i controlli da fare
  function handleValidatonOnChange(target, isFinal = false) {
    const { name, value } = target;

    if ( name === "ID_partner" && (value === "" || value === null || value === undefined)) {
      handleErrors(name, "Il campo nome è obbligatorio");
      if (isFinal) {
        // Errore e blocco della scrittura per quel carattere
        return false;
      } else {
        // Se restituisce true, questa f(x) può comunque permettere
        // l'inserimento del valore anche se dovrà comunque mostrare l'errore
        return true;
      }
      
    } else if (name === "ID_partner" && !/^[0-9]+$/.test(value)) {
      handleErrors(name, "Il campo nome deve contenere solo numeri");
      return false;
    }

    /*   
      Esempio controllo multicampo :

      if (
        name === "numero_telefono" &&
        (value === "" || value === null || value === undefined)
      ) {
        handleErrors(name, "Il campo nome è obbligatorio");
        if (isFinal) {
          // errore e blocco della scrittura per quel carattere
          return false;
        } else {
          // se restituisce true, questa f(x) può comunquw permettere
          // l'inserimento del valore anche se dovrà comunque mostrare l'errore
          return true;
        }
        
      } else if (name === "numero_telefono" && !/^[0-9]+$/.test(value)) {
        handleErrors(name, "Il campo nome deve contenere solo numeri");
        return false;
      }
    */

    handleErrors(name, null);
    // se arriva qui è ok
    return true;
  }

  const handleOnChangeForm = (e) => {
    // uso della f(x) precedente per permettere la modifica di un campo
    // (es: il controllo richiede solo numeri, sarà quindi impossibile inserire una lettera)
    if (handleValidatonOnChange(e.target)) {
      setClientB2c({ ...clientB2c, [e.target.name]: e.target.value });
    }
  };

  const submitForm = () => {
    // iterazione su tutti i campi per verificare che siano valide o meno in fase d'invio
    Object.keys(clientB2c).forEach((item) => {
      if (
        handleValidatonOnChange({ name: item, value: clientB2c[item] }, true)
      ) {
        alert("OK");
      }
    });
  };

  return (
    <>
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

            {/* visualizzatore dell'errore */}
            {errors.ID_partner && (
              <p className={style.error}>{errors.ID_partner}</p>
            )}
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
