import style from "@/styles/graph.module.css";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import MenuSection from "@/components/menu/MenuSection";
import { RiMenu2Fill, RiMenu3Fill, RiMoneyEuroBoxFill } from "react-icons/ri";
import Tabs from "@/components/Tabs/tabs";
import AcquistiPerMese from "@/components/Tabs/AcquistiPerMese";
import FieldVisualizer from "@/components/data_component/fieldvisualizer";

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

export default function testgraph({ data }) {
    const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false);
    const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);

    const handleLeftMenu = () => {
        setIsOpenLeftMenu(isOpenLeftMenu ? false : true);
    };

    const handleRightMenu = () => {
        setIsOpenRightMenu(isOpenRightMenu ? false : true);
    };

    const tabData = [
        { label: "Tab 1", content: <AcquistiPerMese /> },
        { label: "Tab 2", content: "Contenuto Tab 2" },
        // Aggiungi altri tabs qui se necessario
    ];

    useEffect(() => {}, []);

    return (
        <>
            <Head>
                <title>MIKE</title>
            </Head>
            <main>
                {/* prima sezione */}
                <FieldVisualizer></FieldVisualizer>
                {/* seconda sezione */}
                <div className={style.GraphSection}>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                    <div className={style.GraphSectionSubSection}>
                        <span>
                            <RiMoneyEuroBoxFill />
                        </span>
                        <div>
                            <p>Fatturato complessivo</p>
                            <b>883.17</b> EUR
                        </div>
                    </div>
                </div>
                {/* tab sezione */}
                <div className={style.GraphSection}>
                    <Tabs data={tabData} />
                </div>
                {/* graph sezione */}
                <div></div>
            </main>
        </>
    );
}
