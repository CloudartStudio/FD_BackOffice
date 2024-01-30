import style from "../../styles/modal.module.css";
import IconSelector from "../IconSelector";
import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import NotificationContext from "../../context/notificationContext";

export default function NewChartTab({ onActionCloseModal, SectionID }) {
  const [Bars, SetBars] = useState([]);
  const GraphName_input = useRef(null);
  const BarReturnName_input = useRef(null);
  const BarColor_input = useRef(null);
  const BarLabel_input = useRef(null);
  const BarQuery_input = useRef(null);

  const NotificationCtx = useContext(NotificationContext);

  const handleAddnewBar = () => {
    const Label = BarLabel_input.current.value;
    const Query = BarQuery_input.current.value;
    const ReturnName = BarReturnName_input.current.value;
    const BarColor = BarColor_input.current.value;

    if (Label && Query && ReturnName) {
      const newBar = {
        Label: Label,
        Color: BarColor,
        Query: Query,
        ReturnName: ReturnName,
      };

      // Utilizza lo spread operator per creare una nuova copia dell'array
      const newBars = [...Bars, newBar];

      // Imposta il nuovo stato
      SetBars(newBars);
    }
  };

  const HandleSendNewChart_PostRequest = async () => {
    NotificationCtx.showNotification({
      title: "Salvataggio",
      message: "In attesa di salvataggio...",
      status: "wait",
    });

    const newConfig = {
      GraphName: GraphName_input.current.value,
      SectionID: SectionID,
      Bars: Bars,
    };

    const response = await axios.post(
      "http://localhost:3000/api/visualizer/chart",
      {
        newConfig: newConfig,
      }
    );

    NotificationCtx.showNotification({
      title: "Salvataggio",
      message: "Il salvataggio è andato a buon fine",
      status: "success",
    });
    onActionCloseModal();
  };

  return (
    <>
      <div className={style.Modal}>
        <div className={style.ModalHeader}>
          <h5>NUOVO GRAFICO</h5>
          <span onClick={onActionCloseModal} className={style.closeBtnModal}>
            ✖
          </span>
        </div>
        <div className={style.ModalBody}>
          <div className={style.ModalField}>
            <label>Nome grafico</label>
            <br />
            <input
              ref={GraphName_input}
              type={"text"}
              placeholder="Nome grafico..."
              name="GraphName"
            ></input>
          </div>
          <AddBars
            BarColor_input={BarColor_input}
            BarLabel_input={BarLabel_input}
            BarQuery_input={BarQuery_input}
            handleAddnewSection={handleAddnewBar}
            BarReturnName_input={BarReturnName_input}
            Bars={Bars}
          ></AddBars>
        </div>

        <div className={style.ModalFoot}>
          <button
            onClick={HandleSendNewChart_PostRequest}
            className={style.Success}
          >
            INVIA
          </button>
        </div>
      </div>
    </>
  );
}

function AddBars({
  BarColor_input,
  handleAddnewSection,
  BarLabel_input,
  BarQuery_input,
  BarReturnName_input,
  Bars,
}) {
  return (
    <div className={style.FullModalFieldSection}>
      <label>Barre del grafico</label>
      <hr />
      {/*PER AGGIUNGERE*/}
      <div className={style.SectionLine}>
        <div className={style.SmallCell}>
          <p className={style.SectionCell}>
            <label>Label</label>
            <br></br>
            <input ref={BarLabel_input} type="text"></input>
          </p>
        </div>
        <div className={style.SmallCell}>
          <p className={style.SectionCell}>
            <label>Return name</label>
            <br></br>
            <input ref={BarReturnName_input} type="text"></input>
          </p>
        </div>
        <div className={style.SmallCell}>
          <p className={style.SectionCell}>
            <label>Bar Color</label>
            <br></br>
            <input ref={BarColor_input} type="text"></input>
          </p>
        </div>
        <div className={style.Cell}>
          <p className={style.BigSectionCell}>
            <label>Query</label>
            <br></br>
            <input ref={BarQuery_input} type="text"></input>
          </p>
          {/* 
                                        <div>Vertical order popup</div> */}
        </div>
        <div className={style.IconCell}>
          <p>
            <button onClick={handleAddnewSection}>
              <IconSelector IconSelector={"add"}></IconSelector>
            </button>
          </p>
        </div>
      </div>
      {Bars &&
        Bars.map((bar) => {
          if (bar)
            return (
              <div className={style.SectionLine}>
                <div className={style.SmallCell}>
                  <p className={style.SectionCell}>{bar.Label}</p>
                </div>
                <div className={style.SmallCell}>
                  <p className={style.SectionCell}>{bar.ReturnName}</p>
                </div>
                <div className={style.Cell}>
                  <p className={style.BigSectionCell}>{bar.Query}</p>
                </div>
                <div className={style.IconCell}></div>
              </div>
            );
        })}
    </div>
  );
}
