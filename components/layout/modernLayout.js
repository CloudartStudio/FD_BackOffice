import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import style from "../../styles/modernlayout.module.css";
import ModernMenu from "../../components/layout/modernMenu";
import ParticleLayer from "./particleLayer";
import IconSelector from "../IconSelector";
import NotificationContext from "../../context/notificationContext";
import PopupSimple from "../misc/popup_simple";
import { useSession } from "next-auth/react";
import LoginModal from "../../components/modal/LoginModal";
import AvatarWithMenu from "../misc/AvatarWithMenu";

const ModernLayout = ({ children }) => {
    const [IsFullScreen, setISFullScreen] = useState(false);
    const [indexOfPage, SetIndexOfPage] = useState(1);

    const NotificationCtx = useContext(NotificationContext);
    const ActiveNotification = NotificationCtx.notification;

    const { data: _session, status } = useSession();
    console.log("status", status);

    return (
        <>
            <Head>
                <title>FIRST DATA</title>
                <meta name="description" content="first data è l'applicazione web per la gestione dei tuoi dati e contenuti online" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={style.main}>
                <ModernMenu indexOfPage={indexOfPage} IsFullScreen={IsFullScreen}></ModernMenu>
                <ParticleLayer></ParticleLayer>
                <div
                    className={style.IconMain}
                    onClick={() => {
                        setISFullScreen(!IsFullScreen);
                    }}
                >
                    {IsFullScreen && <IconSelector IconSelector="SmallScreen"></IconSelector>}
                    {!IsFullScreen && <IconSelector IconSelector="FullScreen"></IconSelector>}
                </div>
                {status != "loading" && status != "unauthenticated" && (
                    <div className={style.IconLogOut}>
                        <AvatarWithMenu name="Michele"></AvatarWithMenu>
                        {/*  */}
                    </div>
                )}

                <div className={`${style.mainbase} ${IsFullScreen ? style.expanded : ""}`}>
                    {status === "loading" && <h1>loading</h1>}
                    {status != "loading" && (
                        <>
                            {status != "unauthenticated" && (
                                <>
                                    {ActiveNotification && <PopupSimple notification={ActiveNotification}></PopupSimple>}
                                    {children}
                                </>
                            )}

                            {status == "unauthenticated" && (
                                <LoginModal
                                    onActionCloseModal={() => {
                                        SetIndexOfPage(0);
                                    }}
                                ></LoginModal>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default ModernLayout;
