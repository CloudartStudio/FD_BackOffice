import Head from "next/head";
import fetch from "node-fetch";
import NewPartnerModal from "../components/modal/NewPartnerModal";
import { useEffect, useState } from "react";
import style from "../styles/home.module.css";
import Tabs from "../components/Tabs/modernTabs";
import ManagePages from "../components/PagesComponent/ManagePages";
import Link from "next/link";
import NewClientPartnerB2B from "../components/modal/NewClientPartnerB2B";
import NewClientPartnerB2C from "../components/modal/NewClientPartnerB2C";
import SingleSellModal from "../components/modal/SingleSellModal";
import DailySellModal from "../components/modal/DailySellModal";
import { useSession } from "next-auth/react";

const Home = () => {
    const [indexData, setIndexData] = useState([]);

    const [indexOfPage, SetIndexOfPage] = useState(0);
    const { data: _session, status } = useSession();

    const HandleOpenNewClientPartnerB2B = () => {
        SetIndexOfPage(3);
    };

    const HandleCloseNewClientPartnerB2B = () => {
        SetIndexOfPage(0);
    };

    const HandleOpenNewClientPartnerB2C = () => {
        SetIndexOfPage(4);
    };

    const HandleCloseNewClientPartnerB2C = () => {
        SetIndexOfPage(0);
    };

    const HandleOpenNewPartner = () => {
        SetIndexOfPage(2);
    };

    const HandleCloseNewPartner = () => {
        SetIndexOfPage(0);
    };

    const HandleOpenSingleSell = () => {
        SetIndexOfPage(5);
    };

    const HandleCloseSingleSell = () => {
        SetIndexOfPage(0);
    };

    const HandleOpenDailySell = () => {
        SetIndexOfPage(6);
    };

    const HandleCloseDailySell = () => {
        SetIndexOfPage(0);
    };

    useEffect(() => {
        const _fetch = async () => {
            const response = await fetch("http://localhost:3000/api/getMenuData");
            const responseOfCentralLabel = await fetch("http://localhost:3000/api/getCentralLabelHome");

            const menu_data = await response.json();
            const labelhome_data = await responseOfCentralLabel.json();

            const data = {
                menu_data: menu_data,
                labelhome_data: labelhome_data,
            };

            return data;
        };

        _fetch()
            .then((result) => {
                setIndexData(result);
            })
            .catch((error) => {});
    }, []);

    return (
        <>
            {_session && indexOfPage === 0 && (
                <div className={style.HomeContainer}>
                    <div className={style.BadgeAndButtonContainer}>
                        <div className={style.BadgeContainer}>
                            {indexData &&
                                indexData.labelhome_data &&
                                indexData.labelhome_data.map((item, index) => (
                                    <div key={index} className={style.SimpleCard}>
                                        <div className={style.SimpleCardlabel}>{item.Label}</div>
                                        <div className={style.SimpleCardValue}>{item.Value}</div>
                                    </div>
                                ))}
                        </div>

                        <div className={style.BtnContainer}>
                            {_session.user.email.ID_ruolo === 3 && (
                                <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenSingleSell}>
                                    <h3>VENDITA SINGOLA</h3>
                                </button>
                            )}

                            {_session.user.email.ID_ruolo === 3 && (
                                <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenDailySell}>
                                    <h3>VENDITA GIORNALIERA</h3>
                                </button>
                            )}
                        </div>

                        <div className={style.BtnContainer}>
                            {_session.user.email.ID_ruolo === 1 && (
                                <button id="add-customer" class="SimpleCard Clickable">
                                    <h3>NUOVO COLLABORATORE</h3>
                                </button>
                            )}
                            {_session.user.email.ID_ruolo === 1 && (
                                <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewPartner}>
                                    <h3>NUOVO PARTNER</h3>
                                </button>
                            )}
                        </div>

                        {_session.user.email.ID_ruolo === 3 && (
                            <div className={style.BtnContainer}>
                                <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewClientPartnerB2B}>
                                    <h3>NUOVO CLIENTE B2B</h3>
                                </button>

                                <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewClientPartnerB2C}>
                                    <h3>NUOVO CLIENTE B2C</h3>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={style.HomeContent}>
                        {_session.user.email.ID_ruolo === 1 && (
                            <Tabs
                                data={[
                                    {
                                        label: "PAGES",
                                        content: (
                                            <>
                                                <br></br>
                                                <Link className={style.GoToPageBtn} href={"/manage/dpage"}>
                                                    Vai alla pagina
                                                </Link>
                                                <ManagePages isPreview={true}></ManagePages>
                                            </>
                                        ),
                                    },
                                    {
                                        label: "USERS",
                                        content: "Users",
                                    },
                                ]}
                            ></Tabs>
                        )}
                        {_session.user.email.ID_ruolo === 3 && (
                            <Tabs
                                data={[
                                    {
                                        label: "LISTA CLIENTI",
                                        content: "CLIENTI",
                                    },
                                ]}
                            ></Tabs>
                        )}
                    </div>
                </div>
            )}

            {indexOfPage === 2 && <NewPartnerModal onActionCloseModal={HandleCloseNewPartner}></NewPartnerModal>}
            {indexOfPage === 3 && <NewClientPartnerB2B onActionCloseModal={HandleCloseNewClientPartnerB2B}></NewClientPartnerB2B>}
            {indexOfPage === 4 && <NewClientPartnerB2C onActionCloseModal={HandleCloseNewClientPartnerB2C}></NewClientPartnerB2C>}
            {indexOfPage === 5 && <SingleSellModal onActionCloseModal={HandleCloseSingleSell}></SingleSellModal>}
            {indexOfPage === 6 && <DailySellModal onActionCloseModal={HandleCloseDailySell}></DailySellModal>}
        </>
    );
};

export default Home;
