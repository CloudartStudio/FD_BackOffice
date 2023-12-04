import Head from "next/head";
import fetch from "node-fetch";
import NewClientModal from "../components/modal/NewClientModal";
import NewPartnerModal from "../components/modal/NewPartnerModal";
import { useEffect, useState } from "react";
import style from "../styles/home.module.css";
import Tabs from "../components/Tabs/modernTabs";
import ManagePages from "../components/PagesComponent/ManagePages";
import Link from "next/link";

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
        </>
    );
};

export default Home;
