import React, { useState, useEffect } from "react";
import Head from "next/head";
import NewPageModal from "../../components/modal/NewPageModal";
import TableClientib2c from "../../components/table/TableClientib2c";
import fetch from "node-fetch";
import style from "../../styles/table.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ManageClient({ isPreview = false }) {
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
            const response = await fetch("http://localhost:3000/api/auth/account/cliente/b2c");
            const data = await response.json();
            const tempData = {
                head_data: [
                    {
                        id: 0,
                        col: [
                            {
                                id: 0,
                                label: "ID",
                            },
                            {
                                id: 1,
                                label: "nome",
                            },
                            {
                                id: 2,
                                label: "data_nascita",
                            },
                            {
                                id: 3,
                                label: "telefono",
                            },
                            {
                                id: 4,
                                label: "email",
                            },
                            {
                                id: 5,
                                label: "indirizzo",
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
            {_session.user.email.ID_ruolo == 3 && indexOfPage === 0 && (
                <div className={isPreview ? "" : style.PageContainer}>
                    <Head>
                        <title>Manage Page</title>
                    </Head>
                    <div>
                        {TableData && (
                            <TableClientib2c
                                setUpdate={() => {
                                    setUpdate(!update);
                                }}
                                head_data={TableData.head_data}
                                body_data={TableData.body_data}
                                isPreview={isPreview}
                                footer_action={HandleOpenNewPage}
                            ></TableClientib2c>
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
