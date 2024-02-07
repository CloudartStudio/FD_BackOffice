import React, { useState, useEffect } from "react";
import Head from "next/head";
import NewPageModal from "../../components/modal/NewPageModal";
import TablePages from "../../components/table/TablePages";
import fetch from "node-fetch";
import style from "../../styles/table.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ManagePages({ isPreview = false }) {
    const [openModalNewPage, setOpenModalNewPage] = useState(false);
    const [TableData, setTableData] = useState({});
    const [update, setUpdate] = useState(false);

    const [indexOfPage, SetIndexOfPage] = useState(0);

    const router = useRouter();

    const { data: _session, status } = useSession();

    const HandleCloseNewPage = () => {
        setOpenModalNewPage(false);
        SetIndexOfPage(0);
    };

    const HandleOpenNewPage = () => {
        setOpenModalNewPage(true);
        SetIndexOfPage(1);
    };

    useEffect(() => {
        if (_session.user.email.ID_ruolo != 1 && isPreview === false) {
            router.push("/404");
        }

        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/manage/dpage");
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
            {_session.user.email.ID_ruolo == 1 && indexOfPage === 0 && (
                <div className={isPreview ? "" : style.PageContainer}>
                    <Head>
                        <title>Manage Page</title>
                    </Head>
                    <div>
                        {TableData && (
                            <TablePages
                                setUpdate={() => {
                                    setUpdate(!update);
                                }}
                                head_data={TableData.head_data}
                                body_data={TableData.body_data}
                                isPreview={isPreview}
                                row_actions={[
                                    {
                                        doAction: (SetOpen, Data) => {},
                                    },
                                ]}
                                footer_action={HandleOpenNewPage}
                                Title={"Manage Page"}
                                Description={"Use this page to create and Manage the page"}
                            ></TablePages>
                        )}
                    </div>
                </div>
            )}
            {indexOfPage === 1 && (
                <>
                    <Head>
                        <title>Manage Page - New page</title>
                    </Head>
                    <NewPageModal onActionCloseModal={HandleCloseNewPage}></NewPageModal>
                </>
            )}
        </>
    );
}
