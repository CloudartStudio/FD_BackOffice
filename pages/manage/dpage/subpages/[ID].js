import React, { useState, useEffect } from "react";
import Head from "next/head";
import NewSubPageModal from "../../../../components/modal/NewSubPageModal";
import TableSubPage from "../../../../components/table/TableSubPage";
import fetch from "node-fetch";
import style from "../../../../styles/table.module.css";
import { useRouter } from "next/router";

export default function ManageSubPages({ isPreview = false }) {
    const [openModalNewPage, setOpenModalNewPage] = useState(false);
    const [TableData, setTableData] = useState({});
    const [update, setUpdate] = useState(false);
    const [indexOfPage, SetIndexOfPage] = useState(0);
    const router = useRouter();

    const { ID } = router.query;

    const HandleCloseNewPage = () => {
        setOpenModalNewPage(false);
        SetIndexOfPage(0);
    };

    const HandleOpenNewPage = () => {
        setOpenModalNewPage(true);
        SetIndexOfPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/manage/dpage/subpage/" + ID);
            const data = await response.json();
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
                            {
                                id: 3,
                                label: "Edit",
                            },
                        ],
                    },
                ],
                body_data: [...data],
            };
            setTableData(tempData);
        };

        if (indexOfPage === 0) fetchData();
    }, [indexOfPage, update]);

    return (
        <>
            {indexOfPage === 0 && (
                <div className={isPreview ? "" : style.PageContainer}>
                    <Head>
                        <title>Manage Page</title>
                    </Head>
                    <div>
                        {TableData && (
                            <TableSubPage
                                setUpdate={() => {
                                    setUpdate(!update);
                                }}
                                MainPageId={ID}
                                head_data={TableData.head_data}
                                body_data={TableData.body_data}
                                isPreview={isPreview}
                                row_actions={[
                                    {
                                        doAction: (SetOpen, Data) => {},
                                    },
                                ]}
                                footer_action={HandleOpenNewPage}
                                Title={"SubPages - " + ID}
                                Description={"Manage the subpages of the page "}
                            ></TableSubPage>
                        )}
                    </div>
                </div>
            )}
            {indexOfPage === 1 && (
                <>
                    <Head>
                        <title>Manage Page - New page</title>
                    </Head>
                    <NewSubPageModal onActionCloseModal={HandleCloseNewPage}></NewSubPageModal>
                </>
            )}
        </>
    );
}
