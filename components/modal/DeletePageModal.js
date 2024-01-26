import style from "../../styles/modal.module.css";
import IconSelector from "../IconSelector";
import React, { useState, useRef } from "react";
import axios from "axios";

export default function DeletePageModal({ isOpen, onActionCloseModal, id, name }) {
    const handleSubmit = () => {
        axios
            .delete(`http://localhost:3000/api/manage/dpage/subpage/${id}`)
            .then((res) => {
                onActionCloseModal();
            })
            .catch((err) => {});
    };

    const handleClose = () => {
        onActionCloseModal();
    };

    return (
        <>
            {isOpen && (
                <div className={style.ModalContainer}>
                    <div className={style.Modal}>
                        <div className={style.ModalHeader}>
                            <h5>
                                Vuoi eliminare la pagina - <b>{name}</b> ?
                            </h5>
                            <span onClick={handleClose} className={style.closeBtnModal}>
                                ✖
                            </span>
                        </div>
                        <div className={style.ModalBody}>
                            <p>
                                <b>ATTENZIONE:</b> questa operazione non è reversibile
                            </p>
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
                </div>
            )}
        </>
    );
}
