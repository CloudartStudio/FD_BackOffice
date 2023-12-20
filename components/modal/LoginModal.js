import style from "../../styles/modal.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SectionManager({ onActionCloseModal }) {
    const [InfoPanel, setInfoPanel] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(undefined);

    const handleLoginAction = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            email: InfoPanel.email,
            testfield: InfoPanel.password,
            password: InfoPanel.password,
        });

        if (result.error) {
            setLoginError(result.error);
        }
    };

    const handleOnChangeForm = (e) => {
        setInfoPanel({ ...InfoPanel, [e.target.name]: e.target.value });
    };

    return (
        <div className={style.ModalLogin}>
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
                    {loginError && (
                        <div style={{ color: "#dd22225f" }} className={style.ModalFieldLogin}>
                            {loginError}
                        </div>
                    )}
                    <div className={style.ModalFieldLogin}>
                        <button onClick={handleLoginAction}>LOG-IN</button>
                    </div>
                    <div className={style.ModalFieldLogin}>
                        <i>hai dimenticato la password? vuoi creare un nuovo account?</i>
                        <button
                            onClick={() => {
                                alert("404");
                            }}
                        >
                            CONTATTACI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
