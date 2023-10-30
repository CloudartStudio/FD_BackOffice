import Head from "next/head";
import fetch from "node-fetch";
import NewClientModal from "../components/modal/NewClientModal";
import NewPartnerModal from "../components/modal/NewPartnerModal";
import { useEffect, useState } from "react";
import style from "../styles/home.module.css";

export const getServerSideProps = async () => {
    const response = await fetch("http://localhost:3000/api/getMenuData");
    const responseOfCentralLabel = await fetch(
        "http://localhost:3000/api/getCentralLabelHome"
    );
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

    const HandleOpenNewPartner = () => {
        setOpenModalNewPartner(true);
    };

    const HandleCloseNewPartner = () => {
        setOpenModalNewPartner(false);
    };

    const HandleOpenNewClient = () => {
        setOpenModalNewClient(true);
    };

    const HandleCloseNewClient = () => {
        setOpenModalNewClient(false);
    };

    useEffect(() => {
        const _fetch = async () => {
            const response = await fetch(
                "http://localhost:3000/api/getMenuData"
            );
            const responseOfCentralLabel = await fetch(
                "http://localhost:3000/api/getCentralLabelHome"
            );

            const menu_data = await response.json();
            const labelhome_data = await responseOfCentralLabel.json();

            console.log("menu_data", menu_data);
            console.log("labelhome_data", labelhome_data);
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
            <NewClientModal
                isOpen={openModalNewClient}
                onActionCloseModal={HandleCloseNewClient}
            ></NewClientModal>
            <NewPartnerModal
                isOpen={openModalNewPartner}
                onActionCloseModal={HandleCloseNewPartner}
            ></NewPartnerModal>
            <div className={style.HomeContainer}>
                <div className={style.BadgeAndButtonContainer}>
                    <div className={style.BadgeContainer}>
                        {indexData &&
                            indexData.labelhome_data &&
                            indexData.labelhome_data.map((item, index) => (
                                <div key={index} className={style.SimpleCard}>
                                    <div className={style.SimpleCardlabel}>
                                        {item.Label}
                                    </div>
                                    <div className={style.SimpleCardValue}>
                                        {item.Value}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className={style.BtnContainer}>
                        <button
                            id="add-customer"
                            class="SimpleCard Clickable"
                            onClick={HandleOpenNewClient}
                        >
                            <h3>NUOVO CLIENTE</h3>
                        </button>

                        <button
                            id="add-customer"
                            class="SimpleCard Clickable"
                            onClick={HandleOpenNewPartner}
                        >
                            <h3>NUOVO COLLABORATORE</h3>
                        </button>
                    </div>
                </div>
                <div className={style.HomeContent}>TODO</div>
            </div>
        </>
    );
};

export default Home;
