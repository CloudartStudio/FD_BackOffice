import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect, useContext } from "react";
import style from "../../styles/modernlayout.module.css";
//import ModernMenu from "../../components/layout/modernMenu";
import IconSelector from "../IconSelector";
import NotificationContext from "../../context/notificationContext";
import PopupSimple from "../misc/popup_simple";
import LoginModal from "../../components/modal/LoginModal";
import { useSession, signIn, signOut } from "next-auth/react";
import QueryEditor from "../modal/QueryEditor/Editor";

const ModernLayout = ({ children }) => {
    const [MenuData, setMenuData] = useState([]);
    const [IsFullScreen, setISFullScreen] = useState(false);
    const [indexOfPage, SetIndexOfPage] = useState(1);

    const NotificationCtx = useContext(NotificationContext);
    const ActiveNotification = NotificationCtx.notification;

    const { data: _session } = useSession();

    useEffect(() => {
        if (_session) {
            const session = _session.user.email;
            console.log("session", session);
            if (session.ID_ruolo === 1 || session.ID_ruolo === 2 || session.ID_ruolo === 3) {
                SetIndexOfPage(0);
            } else if (session.ID_ruolo === 4) {
                SetIndexOfPage(2);
            }
        } else {
            SetIndexOfPage(1);
        }
    }, [_session]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/getMenuData")
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return [];
                });
            const data = await response.json();
            setMenuData(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>FIRST DATA</title>
                <meta name="description" content="first data è l'applicazione web per la gestione dei tuoi dati e contenuti online" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={style.main}>
                {/*<ModernMenu indexOfPage={indexOfPage} MenuData={MenuData} IsFullScreen={IsFullScreen}></ModernMenu>*/}
                <div className={`${style.mainbase} ${IsFullScreen ? style.expanded : ""}`}>
                    {indexOfPage == 0 && (
                        <>
                            {ActiveNotification && <PopupSimple notification={ActiveNotification}></PopupSimple>}
                            {children}
                        </>
                    )}
                    {indexOfPage == 1 && (
                        // <LoginModal
                        //     onActionCloseModal={() => {
                        //         SetIndexOfPage(0);
                        //     }}
                        // ></LoginModal>
                        <QueryEditor></QueryEditor>
                    )}
                    {indexOfPage == 2 && <h1>TROPPO PRESTO, TORNA PIU AVANTI</h1>}
                </div>
                <div
                    className={style.IconMain}
                    onClick={() => {
                        setISFullScreen(!IsFullScreen);
                    }}
                >
                    {IsFullScreen && <IconSelector IconSelector="SmallScreen"></IconSelector>}
                    {!IsFullScreen && <IconSelector IconSelector="FullScreen"></IconSelector>}
                </div>
            </main>
        </>
    );
};

export default ModernLayout;
