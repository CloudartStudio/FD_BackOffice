import style from "../../styles/modal.module.css";
import IconSelector from "../IconSelector";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import RoleOptions from "../misc/role_options";
import TypeOptions from "../misc/type_options";

export default function SectionManager({
  onActionCloseModal,
  startingSection,
  saveNewSections,
}) {
  const [Sections, setSections] = useState([]);
  const [SelectedSection, setSelectedSection] = useState(startingSection);
  const [InfoPanel, setInfoPanel] = useState({
    NomeSezione: "",
    VerticalOrder: "",
    Ruolo: "",
    Tipo: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dynamicSections")
      .then((res) => {
        setSections(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = () => {
    saveNewSections(SelectedSection);
    onActionCloseModal();
  };

  const handleClose = () => {
    onActionCloseModal();
  };

  const handleOnChangeForm = (e) => {
    setInfoPanel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className={style.Modal}>
        <div className={style.ModalHeader}>
          <h5>EDITOR DELLE SEZIONI</h5>
          <span onClick={handleClose} className={style.closeBtnModal}>
            ✖
          </span>
        </div>
        <div className={style.ModalBodySplitted}>
          <div>
            <div className={style.SectionSelector}>
              <div>
                <h5>Seleziona le sezioni da modificare</h5>
              </div>
              <div className={style.SectionSelectorBody}>
                {Sections &&
                  Sections.map((s) => {
                    return (
                      <div className={style.row}>
                        <div className={style.action}>
                          <button
                            onClick={() => {
                              setSelectedSection((prev) =>
                                prev.find(
                                  (ss) => s.NomeSezione == ss.NomeSezione
                                )
                                  ? prev.filter(
                                      (e) => e.NomeSezione !== s.NomeSezione
                                    )
                                  : [...prev, s]
                              );
                            }}
                            className={style.Success}
                          >
                            {SelectedSection.find(
                              (ss) => s.NomeSezione == ss.NomeSezione
                            )
                              ? "➖"
                              : "➕"}
                          </button>
                        </div>
                        <div
                          className={style.sectionLabel}
                          onClick={() => {
                            setInfoPanel(s);
                          }}
                        >
                          {s.NomeSezione}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="InfoPanel">
            <div>
              <div className={style.ModalField}>
                <label>Nome sezione</label>
                <br />
                <input
                  value={InfoPanel.NomeSezione}
                  onChange={handleOnChangeForm}
                  type={"text"}
                  placeholder="Nome..."
                  name="NomeSezione"
                ></input>
              </div>
              <div className={style.ModalField}>
                <label>Ordine verticale</label>
                <br />
                <input
                  value={InfoPanel.VerticalOrder}
                  onChange={handleOnChangeForm}
                  type={"text"}
                  placeholder="Vertical order..."
                  name="VerticalOrder"
                ></input>
              </div>
              <RoleOptions
                selectedRole={InfoPanel.Ruolo}
                setSelectedRole={(value) => {
                  setInfoPanel((prev) => ({ ...prev, Ruolo: value }));
                }}
              ></RoleOptions>
              <TypeOptions
                selectedTypes={InfoPanel.Tipo}
                setSelectedTypes={(value) => {
                  setInfoPanel((prev) => ({ ...prev, Tipo: value }));
                }}
              ></TypeOptions>
              {InfoPanel && (
                <button
                  style={{
                    backgroundColor: "#ffffff2f",
                    border: "1px solid white",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    width: "90%",
                    margin: "10px auto",
                  }}
                  onClick={() => {
                    setInfoPanel({});
                  }}
                >
                  add
                </button>
              )}
              {!InfoPanel && (
                <button
                  style={{
                    backgroundColor: "#ffffff2f",
                    border: "1px solid white",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    width: "90%",
                    margin: "10px auto",
                  }}
                  onClick={() => {
                    setInfoPanel({});
                  }}
                >
                  edit
                </button>
              )}
            </div>
            <button
              style={{
                backgroundColor: "#ffffff2f",
                border: "1px solid white",
                color: "white",
                padding: "10px 15px",
                borderRadius: "5px",
                fontSize: "1rem",
                width: "90%",
                margin: "0 auto",
              }}
              onClick={() => {
                setInfoPanel({
                  NomeSezione: "",
                  VerticalOrder: "",
                  Ruolo: "",
                  Tipo: "",
                });
              }}
            >
              reset
            </button>
          </div>
        </div>

        <div className={style.ModalFoot}>
          <button onClick={handleClose} className={style.Delete}>
            Annulla
          </button>
          <button onClick={handleSubmit} className={style.Success}>
            Conferma
          </button>
        </div>
      </div>
    </>
  );
}
