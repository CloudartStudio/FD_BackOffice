import style from "../../styles/modal.module.css";
import React, { useState, useRef } from "react";

export default function TestModal({ isOpen, onActionCloseModal }) {
    const [clientB2c, setClientB2c] = useState({ ID_partner: null });

    const [errors, setErrors] = useState({});

    const handleErrors = (name, error) => {
        setErrors({ ...errors, [name]: error });
    };

    function handleValidatonOnChange(target, isFinal = false) {
        const { name, value } = target;

        if (name === "ID_partner" && (value === "" || value === null || value === undefined)) {
            handleErrors(name, "Il campo nome è obbligatorio");
            if (isFinal) {
                return false;
            } else {
                return true;
            }
        } else if (name === "ID_partner" && !/^[0-9]+$/.test(value)) {
            handleErrors(name, "Il campo nome deve contenere solo numeri");
            return false;
        }

        handleErrors(name, null);
        return true;
    }

    const handleOnChangeForm = (e) => {
        if (handleValidatonOnChange(e.target)) {
            setClientB2c({ ...clientB2c, [e.target.name]: e.target.value });
        }
    };

    const submitForm = () => {
        Object.keys(clientB2c).forEach((item) => {
            if (handleValidatonOnChange({ name: item, value: clientB2c[item] }, true)) {
                alert("OK");
            }
        });
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
                            {errors.ID_partner && <p className={style.error}>{errors.ID_partner}</p>}
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
