import Head from "next/head";
import fetch from "node-fetch";
import { Inter } from "next/font/google";
import NewClientModal from "../components/modal/NewClientModal";
import NewPartnerModal from "../components/modal/NewPartnerModal";
import { useState } from "react";
import MenuSection from "../components/menu/MenuSection";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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

            {data.labelhome_data.map((item, index) => (
                <div key={index} class="SimpleCard">
                    <h3>
                        {item.Label} <br />
                        <br />
                        <b>{item.Value}</b>
                    </h3>
                </div>
            ))}

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
        </>
    );
};

export default Home;
