import style from "../styles/graph.module.css";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import NewPageModal from "../components/modal/NewPageModal";
import Table1 from "../components/table/Table1";
import fetch from "node-fetch";

export default function manage_pages() {
    const [openModalNewPage, setOpenModalNewPage] = useState(false);
    const [TableData, setTableData] = useState({});

    const HandleCloseNewPage = () => {
        setOpenModalNewPage(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3000/api/dynamicPage"
            );
            const data = await response.json();
            console.log("DATA", data);
            const tempData = {
                head_data: [
                    {
                        id: 0,
                        col: [
                            {
                                id: 0,
                                label: "ID Pagina",
                            },
                            {
                                id: 1,
                                label: "Nome Pagina",
                            },
                            {
                                id: 2,
                                label: "Link",
                            },
                            {
                                id: 3,
                                label: "Ruolo minimo",
                            },
                        ],
                    },
                ],
                body_data: [...data],
            };
            setTableData(tempData);
        };
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Manage Page</title>
            </Head>
            <NewPageModal
                isOpen={openModalNewPage}
                onActionCloseModal={HandleCloseNewPage}
            ></NewPageModal>
            <div>
                <div>
                    {TableData && (
                        <Table1
                            head_data={TableData.head_data}
                            body_data={TableData.body_data}
                            row_actions={[
                                {
                                    doAction: (isOpen, SetOpen, Data) => {},
                                },
                            ]}
                            footer_action={() => {
                                setOpenModalNewPage(true);
                            }}
                            Title={"Manage Page"}
                            Description={
                                "Use this page to create and Manage the page"
                            }
                        ></Table1>
                    )}
                </div>
            </div>
        </>
    );
}
