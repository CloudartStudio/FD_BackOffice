import style from "../../styles/modal.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ContactUSModal from "./ContactUsModal";

export default function SectionManager({ onActionCloseModal }) {
    const [openModalContactUs, setOpenModalContactUs] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const [InfoPanel, setInfoPanel] = useState({ email: "", password: "", });

    const [loginError, setLoginError] = useState({message: "", });

    const handleLoginAction = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            email: InfoPanel.email,
            testfield: InfoPanel.password,
            password: InfoPanel.password,
        });

        if (result.error) {
            setLoginError({message : "Credenziali non valide"});
        }
    };

    const handleOnChangeForm = (e) => {
        setInfoPanel({ ...InfoPanel, [e.target.name]: e.target.value });
    };

    const handleOpenContactUsModal = () => {
        setOpenModalContactUs(true);
        setPageIndex(1);
    }

    const handleCloseContactUsModal = () => { 
        setOpenModalContactUs(false);
        setPageIndex(0);
    }
    return (
        <div className={style.ModalLogin}>
            { pageIndex == 0 && (
                <div className={style.ModalBodyLogin}>
                <div className="InfoPanel">
                    <div>
                        <div className={style.ModalFieldLogin}>
                            <label>Email</label>
                            <br />
                            <input value={InfoPanel.email} onChange={handleOnChangeForm} type={"email"} placeholder="Email..." name="email"></input>
                        </div>
                        <div className={style.ModalFieldLogin}>
                            <label>Password</label>
                            <br />
                            <input value={InfoPanel.password} onChange={handleOnChangeForm} type={"password"} placeholder="Password..." name="password"></input>
                        </div>
                    </div>
                    {loginError.message && (
                        <div style={{ color: "#dd22225f" }} className={style.ModalFieldLogin}>
                            {loginError.message}
                        </div>
                    )}
                    <div className={style.ModalFieldLogin}>
                        <button onClick={handleLoginAction}>LOG-IN</button>
                    </div>
                    <div className={style.ModalFieldLogin}>
                        <i>hai dimenticato la password? vuoi creare un nuovo account?</i>
                        <button
                            onClick={() => handleOpenContactUsModal()}
                        >
                            CONTATTACI
                        </button>
                    </div>
                </div>
            </div>

            )}
            { pageIndex == 1 &&(
                <ContactUSModal onActionCloseModal={handleCloseContactUsModal} />
            )}
        </div>
    );
}
