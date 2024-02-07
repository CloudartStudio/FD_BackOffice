import style from "../../styles/modal.module.css";
import NotificationContext from "../../context/notificationContext";
import React, { useState, useContext } from "react";
import axios from "axios";

export default function DailySellModal({ isOpen, onActionCloseModal }) {
  const [dailySell, setDailySell] = useState({
    data: "",
    totale_incasso: "",
    totale_numero_vendite: "",
    note: "",
  });

  const NotificationCtx = useContext(NotificationContext);

  const conf = [
    {
      nome: "data",
      expression: /^.+$/,
    },
    {
      nome: "totale_incasso",
      expression: /^[0-9]+$/,
    },
    {
      nome: "totale_numero_vendite",
      expression: /^[0-9]+$/,
    },
    {
      nome: "note",
      expression: /^[a-z0-9 ]+$/i,
    },
  ];

  const [errors, setErrors] = useState({});

  const handleErrors = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const checkSimpleValidation = (name, value, isFinal) => {
    const c = conf.findIndex((conf) => conf.nome === name);
    if (c != -1) {
      if (value == "" || value === null || value === undefined) {
        //IL VALORE è NULLO QUINDI NON CE IL VALORE ,LUTENTE DEVE INSRIRLO
        handleErrors(name, `Il Campo ${name} è obbligatorio!`);
        if (isFinal) {
          return false;
        } else {
          return true;
        }
      } else {
        //VALORE CE FARE IL CONTROLLO CON L'ESPRESSIONE
        if (!conf[c].expression.test(value)) {
          handleErrors(name, `Il valore inserito in ${name} non è corretto`);
          if (isFinal) {
            return false;
          } else {
            return true;
          }
        } else {
          handleErrors(name, null);
          return true;
        }
      }
    } else {
      handleErrors(name, null);
      return true;
    }
  };

  function handleValidationOnChange(target, isFinal = false) {
    const { name, value } = target;

    const result = checkSimpleValidation(name, value, isFinal);

    return result;
  }

  const handleOnChangeForm = (e) => {
    if (handleValidationOnChange(e.target)) {
      setDailySell({ ...dailySell, [e.target.name]: e.target.value });
    }
  };

  const submitForm = () => {
    try {
      let isValid = true;
      Object.keys(dailySell).forEach((item) => {
        if (
          !handleValidationOnChange(
            { name: item, value: dailySell[item] },
            true
          )
        ) {
          isValid = false;
        }
      });
      if (isValid) {
        NotificationCtx.showNotification({
          title: "Attesa",
          message: "Salvataggio in corso...",
          status: "waiting",
        });
        axios
          .post("http://localhost:3000/api/vendite/giornaliera", {
            ID_partner: 3,
            data: dailySell.data,
            totale_incasso: dailySell.totale_incasso,
            totale_numero_vendite: dailySell.totale_numero_vendite,
            note: dailySell.note,
          })
          .then((result) => {
            NotificationCtx.showNotification({
              title: "Salvataggio",
              message: "Il salvataggio è andato a buon fine",
              status: "success",
            });
            onActionCloseModal();
          })
          .catch((error) => {
            NotificationCtx.showNotification({
              title: "Errore",
              message: "Il salvataggio non è andato a buon fine",
              status: "error",
            });
            onActionCloseModal();
            console.log("error", error);
          });
      }
    } catch (err) {
      //TODO: LOGGER
      console.log(err);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={style.Modal}>
          <div className={style.ModalHeader}>
            <h5>NUOVA VENDITA GIORNALIERA</h5>
            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
              ✖
            </span>
          </div>

          <div className={style.ModalBody}>
            <div className={style.ModalBodyLabelContainer}>
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
                {errors.data && <p className={style.error}>{errors.data}</p>}
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
                {errors.totale_incasso && (
                  <p className={style.error}>{errors.totale_incasso}</p>
                )}
              </div>
            </div>

            <div className={style.ModalBodyLabelContainer}>
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
                {errors.totale_numero_vendite && (
                  <p className={style.error}>{errors.totale_numero_vendite}</p>
                )}
              </div>

              {/* note */}
              <div className={style.ModalField}>
                <label>Note</label>
                <br />
                <textarea
                  type={"text"}
                  placeholder="Note..."
                  name="note"
                  onChange={handleOnChangeForm}
                  value={dailySell.note}
                ></textarea>
                {errors.note && <p className={style.error}>{errors.note}</p>}
              </div>
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
      )}
    </>
  );
}
