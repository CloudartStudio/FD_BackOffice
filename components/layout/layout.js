import Head from "next/head";
import fetch from "node-fetch";
import { useState, useEffect } from "react";
import MenuSection from "../../components/menu/MenuSection";
import { RiMenu2Fill, RiMenu3Fill, RiMoneyEuroBoxFill } from "react-icons/ri";
import Link from "next/link";
import style from "../../styles/layout.module.css";

const Layout = ({ children }) => {
    const [MenuData, setMenuData] = useState([]);

    const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false);
    const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);

    const handleLeftMenu = () => {
        console.log("OPEN LEFT MENU");
        setIsOpenLeftMenu(isOpenLeftMenu ? false : true);
    };

    const handleRightMenu = () => {
        console.log("OPEN LEFT MENU");
        setIsOpenRightMenu(isOpenRightMenu ? false : true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3000/api/getMenuData"
            )
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    console.log(error);
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
                <meta
                    name="description"
                    content="first data è l'applicazione web per la gestione dei tuoi dati e contenuti online"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <div className={style.TopNavBar}>
                    <div className={style.LeftIcon}>
                        <span onClick={handleLeftMenu}>
                            <RiMenu2Fill />
                        </span>
                    </div>

                    {/* da cambiare */}
                    <Link href="/">
                        <span className={style.HeaderCompanyName}>
                            FIRST DATA
                        </span>
                    </Link>
                    <div className={style.RightIcon}>
                        <span onClick={handleRightMenu}>
                            <RiMenu3Fill />
                        </span>
                    </div>
                </div>

                {/* <div className="bkgEffect"></div>
                <img className="bkgLogo" src="Img/LogoFirstDataTemp.png" /> */}

                {isOpenLeftMenu && (
                    <nav className="HomeNav NavLeft">
                        <ul>
                            {MenuData.filter((item) => item.IsLeft).map(
                                (item, index) => (
                                    <MenuSection
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                )
                            )}
                        </ul>
                    </nav>
                )}

                {isOpenRightMenu && (
                    <nav className="HomeNav NavRight">
                        <ul>
                            {MenuData.filter((item) => !item.IsLeft).map(
                                (item, index) => (
                                    <MenuSection
                                        verticalOrder={index + 1}
                                        PrevLevel={0}
                                        baseSection={item}
                                    ></MenuSection>
                                )
                            )}
                        </ul>
                    </nav>
                )}
            </header>
            <main>{children}</main>
        </>
    );
};

export default Layout;
