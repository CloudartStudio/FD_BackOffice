import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect, useContext } from "react";
import style from "../../styles/modernlayout.module.css";
import ModernMenu from "../../components/layout/modernMenu";
import IconSelector from "../IconSelector";
import NotificationContext from "../../context/notificationContext";
import PopupSimple from "../misc/popup_simple";

const ModernLayout = ({ children }) => {
    const [MenuData, setMenuData] = useState([]);
    const [IsFullScreen, setISFullScreen] = useState(false);

    const handleLeftMenu = () => {
        setIsOpenLeftMenu(isOpenLeftMenu ? false : true);
    };

    const NotificationCtx = useContext(NotificationContext);

    const ActiveNotification = NotificationCtx.notification;

    const handleRightMenu = () => {
        setIsOpenRightMenu(isOpenRightMenu ? false : true);
    };

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
                <ModernMenu MenuData={MenuData} IsFullScreen={IsFullScreen}></ModernMenu>
                <div className={`${style.mainbase} ${IsFullScreen ? style.expanded : ""}`}>
                    {ActiveNotification && <PopupSimple notification={ActiveNotification}></PopupSimple>}
                    {children}
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
