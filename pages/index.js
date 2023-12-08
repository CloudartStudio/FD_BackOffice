import Head from "next/head";
import fetch from "node-fetch";
import NewClientModal from "../components/modal/NewClientModal";
import NewPartnerModal from "../components/modal/NewPartnerModal";
import { useEffect, useState } from "react";
import style from "../styles/home.module.css";
import Tabs from "../components/Tabs/modernTabs";
import ManagePages from "../components/PagesComponent/ManagePages";
import Link from "next/link";
import NewClientPartnerB2B from "../components/modal/NewClientPartnerB2B";
import NewClientPartnerB2C from "../components/modal/NewClientPartnerB2C";

export const getServerSideProps = async () => {
    const response = await fetch("http://localhost:3000/api/getMenuData");
    const responseOfCentralLabel = await fetch("http://localhost:3000/api/getCentralLabelHome");
    const menu_data = await response.json();
    const labelhome_data = await responseOfCentralLabel.json();

    const data = {
        menu_data: menu_data,
        labelhome_data: labelhome_data,
    };

    return {
        props: {
            data,
        },
    };
};

const Home = ({ data }) => {
    const [openModalNewClient, setOpenModalNewClient] = useState(false);

    const [openModalNewPartner, setOpenModalNewPartner] = useState(false);
    const [indexData, setIndexData] = useState([]);

    const [indexOfPage, SetIndexOfPage] = useState(0);

    // Inizio modifica provvisoria
    // creo degli stati per l'apertura delle modali
    const [openModalNewClientPartnerB2B, setOpenModalNewClientPartnerB2B] = useState(false);
    const [openModalNewClientPartnerB2C, setOpenModalNewClientPartnerB2C] = useState(false);

    // successivamente, creo degli handler per l'apertura e chiusura delle modali
        const HandleOpenNewClientPartnerB2B = () => {
            setOpenModalNewClientPartnerB2B(true);
            SetIndexOfPage(3);
        };

        const HandleCloseNewClientPartnerB2B = () => {
            setOpenModalNewClientPartnerB2B(true);
            SetIndexOfPage(0);
        };

        const HandleOpenNewClientPartnerB2C = () => {
            setOpenModalNewClientPartnerB2C(true);
            SetIndexOfPage(4);
        };

        const HandleCloseNewClientPartnerB2C = () => {
            setOpenModalNewClientPartnerB2C(true);
            SetIndexOfPage(0);
        };
    // fine modifica provvisoria

    const HandleOpenNewPartner = () => {
        setOpenModalNewPartner(true);
        SetIndexOfPage(2);
    };

    const HandleCloseNewPartner = () => {
        setOpenModalNewPartner(false);
        SetIndexOfPage(0);
    };

    const HandleOpenNewClient = () => {
        setOpenModalNewClient(true);
        SetIndexOfPage(1);
    };

    const HandleCloseNewClient = () => {
        setOpenModalNewClient(false);
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
            {indexOfPage === 0 && (
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
                            <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewClient}>
                                <h3>NUOVO CLIENTE</h3>
                            </button>

                            <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewPartner}>
                                <h3>NUOVO COLLABORATORE</h3>
                            </button>
                        </div>

                        {/* bottoni con modale */}
                        <div className={style.BtnContainer}>
                            <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewClientPartnerB2B}>
                                <h3>NUOVO CLIENTE PARTNER B2B</h3>
                            </button>

                            <button id="add-customer" class="SimpleCard Clickable" onClick={HandleOpenNewClientPartnerB2C}>
                                <h3>NUOVO CLIENTE PARTNER B2C</h3>
                            </button>
                        </div>
                        {/* fine bottoni con modale */}
                        
                    </div>
                    <div className={style.HomeContent}>
                        <Tabs
                            data={[
                                {
                                    label: "PAGES",
                                    content: (
                                        <>
                                            <br></br>
                                            <Link className={style.GoToPageBtn} href={"/manage_pages"}>
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
                    </div>
                </div>
            )}

            {indexOfPage === 1 && <NewClientModal isOpen={openModalNewClient} onActionCloseModal={HandleCloseNewClient}></NewClientModal>}

            {indexOfPage === 2 && <NewPartnerModal isOpen={openModalNewPartner} onActionCloseModal={HandleCloseNewPartner}></NewPartnerModal>}

            {/* inizio gestione delle chiusure delle modali */}

            {indexOfPage === 3 && <NewClientPartnerB2B isOpen={openModalNewClientPartnerB2B} onActionCloseModal={HandleCloseNewClientPartnerB2B}></NewClientPartnerB2B>}
            {indexOfPage === 4 && <NewClientPartnerB2C isOpen={openModalNewClientPartnerB2C} onActionCloseModal={HandleCloseNewClientPartnerB2C}></NewClientPartnerB2C>}

            {/* fine gestione */}
        </>
    );
};

export default Home;
