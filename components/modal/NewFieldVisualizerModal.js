import style from "../../styles/modal.module.css";
import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import NotificationContext from "../../context/notificationContext";

export default function NewFieldVisualizerModal({
  onActionCloseModal,
  SectionID,
}) {
  const label1_Input = useRef(null);
  const info_Input = useRef(null);
  const iconid_Input = useRef(null);
  const valueinfo_Input = useRef(null);
  const returnName_Input = useRef(null);
  const Query_Input = useRef(null);

  const NotificationCtx = useContext(NotificationContext);

  const HandleSendNewFieldPostRequest = async () => {
    NotificationCtx.showNotification({
      title: "Salvataggio",
      message: "In attesa di salvataggio...",
      status: "wait",
    });

    const newConfig = {
      Label1: label1_Input.current.value,
      Info: info_Input.current.value,
      IconID: iconid_Input.current.value,
      ValueInfo: valueinfo_Input.current.value,
      ReturnName: returnName_Input.current.value,
      Query: Query_Input.current.value,
      SectionID: SectionID,
    };

    const response = await axios.post(
      "http://localhost:3000/api/visualizer/fieldbase",
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
      <div className={style.ModalContainer}>
        <div className={style.Modal}>
          <div className={style.ModalHeader}>
            <h5>NUOVO VISUALIZZATORE</h5>
            <span onClick={onActionCloseModal} className={style.closeBtnModal}>
              ✖
            </span>
          </div>
          <div className={style.ModalBody}>
            <div className={style.ModalField}>
              <label>Label 1</label>
              <br />
              <input
                ref={label1_Input}
                type={"text"}
                placeholder="label1..."
                name="label1"
              ></input>
            </div>
            <div className={style.ModalField}>
              <label>Info</label>
              <br />
              <input
                ref={info_Input}
                type={"text"}
                placeholder="info..."
                name="info"
              ></input>
            </div>
            <div className={style.ModalField}>
              <label>Icon name</label>
              <br />
              <input
                ref={iconid_Input}
                type={"text"}
                placeholder="iconid..."
                name="iconid"
              ></input>
            </div>
            <div className={style.ModalField}>
              <label>Value info (es: €/$)</label>
              <br />
              <input
                ref={valueinfo_Input}
                type={"text"}
                placeholder="value info..."
                name="valueinfo"
              ></input>
            </div>
            <div className={style.ModalField}>
              <label>Return name</label>
              <br />
              <input
                ref={returnName_Input}
                type={"text"}
                placeholder="returnName info..."
                name="returnName"
              ></input>
            </div>
            <div className={style.FullModalFieldSection}>
              <h3>Query</h3>
              <br />
              <textarea
                ref={Query_Input}
                placeholder="Select * From ..."
                cols={150}
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className={style.ModalFoot}>
            <button
              onClick={HandleSendNewFieldPostRequest}
              className={style.Success}
            >
              INVIA
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
