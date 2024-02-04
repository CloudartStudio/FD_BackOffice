import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function NewClientPartnerB2B({ isOpen, onActionCloseModal }) {
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
    indirizzo_sede_legale: ""
  });

  const conf = [
    {
      nome: "ID_partner",
      expression: /^[0-9]+$/,
    },
    {
      nome: "ragione_sociale",
      expression: /^[a-zA-Z]+$/,
    },
    {
      nome: "partita_iva",
      expression: /^[a-zA-Z]+$/,
    },
    {
      nome: "codice_sdi",
      expression: /^[a-zA-Z]+$/,
    },
    {
      nome: "telefono",
      expression: /^[0-9]+$/,
    },
    {
      nome: "cellulare",
      expression: /^[0-9]+$/,
    },
    {
      nome: "indirizzo",
      expression: /^[a-zA-Z]+$/,
    },
    {
      nome: "nome",
      expression: /^[a-zA-Z]+$/,
    },
    {
      nome: "pec",
      expression: /^[a-zA-Z0-9]+$/,
    },
    {
      nome: "email",
      expression: /^[a-zA-Z0-9]+$/,
    },
    {
      nome: "indirizzo_sede_fisica",
      expression: /^[a-zA-Z0-9]+$/,
    },
    {
      nome: "indirizzo_sede_legale",
      expression: /^[a-zA-Z0-9]+$/,
    },
  ];

  const [errors, setErrors] = useState({});

  const handleErrors = (name, error) => {
    setErrors({ ...errors, [name]: error });
  }

  const checkSimpleValidation = (name, value, isFinal) => {
    const c = conf.findIndex((conf) => conf.nome === name);
    if (c != -1) {
      if (value == " " || value === null || value === undefined) {
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
      setClientB2b({ ...clientB2b, [e.target.name]: e.target.value });
    }
  };

  const submitForm = () => {
    try {
      let isValid = true;
      Object.keys(clientB2b).forEach((item) => {
        if (
          !handleValidationOnChange(
            { name: item, value: clientB2b[item] },
            true
          )
        ) {
          isValid = false;
        }
      });
      if (isValid) {
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
      }
    } catch (err) {
      console.log(err);
      alert("error: sei tu!");
    }
  };

  return (
    <>
      {isOpen && (
        <div className={style.Modal}>
          <div className={style.ModalHeader}>
            <h5>NUOVO CLIENTE PARTNER B2B</h5>
            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
              ✖
            </span>
          </div>

          <div className={style.ModalBody}>
            <div className={style.ModalBodyLabelContainer}>
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
                {errors.ID_partner && (
                  <p className={style.error}>{errors.ID_partner}</p>
                )}
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
                {errors.ragione_sociale && (
                  <p className={style.error}>{errors.ragione_sociale}</p>
                )}
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
                {errors.partita_iva && (
                  <p className={style.error}>{errors.partita_iva}</p>
                )}
              </div>
            </div>

            <div className={style.ModalBodyLabelContainer}>
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
                {errors.codice_sdi && (
                  <p className={style.error}>{errors.codice_sdi}</p>
                )}
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
                {errors.telefono && (
                  <p className={style.error}>{errors.telefono}</p>
                )}
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
                {errors.cellulare && (
                  <p className={style.error}>{errors.cellulare}</p>
                )}
              </div>
            </div>

            <div className={style.ModalBodyLabelContainer}>
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
                {errors.indirizzo && (
                  <p className={style.error}>{errors.indirizzo}</p>
                )}
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
                {errors.nome && (
                  <p className={style.error}>{errors.nome}</p>
                )}
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
                {errors.pec && (
                  <p className={style.error}>{errors.pec}</p>
                )}
              </div>
            </div>

            <div className={style.ModalBodyLabelContainer}>
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
                  {errors.email && (
                  <p className={style.error}>{errors.email}</p>
                )}
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
                {errors.indirizzo_sede_fisica && (
                  <p className={style.error}>{errors.indirizzo_sede_fisica}</p>
                )}
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
                {errors.indirizzo_sede_legale && (
                  <p className={style.error}>{errors.indirizzo_sede_legale}</p>
                )}
              </div>
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
