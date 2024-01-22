import style from "../../styles/table.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import { FaRegTrashAlt } from "react-icons/fa";
import NewPageModal from "../../components/modal/NewPageModal";
import DeletePageModal from "../../components/modal/DeletePageModal";
import React, { useState, useContext } from "react";
import EditPageContext from "../../context/editPageContext";

export default function Table1({ setUpdate, head_data, body_data, footer_action, row_actions, isPreview, Title = null, Description = null }) {
    const [openModalNewPage, setOpenModalNewPage] = useState(false);
    const [openModalDeletePage, setOpenModalDeletePage] = useState(false);
    const [IndexOfThePage, SetIndexOfThePage] = useState(0); // 0 = table 1 = new page 2 = edit page
    const [editPageId, setEditPageId] = useState("");
    const [activeName, setActiveName] = useState("");
    const HandleCloseNewPage = () => {
        setOpenModalNewPage(false);
        SetIndexOfThePage(0);
    };

    const HandleOpenDeletePage = () => {
        setOpenModalDeletePage(true);
        SetIndexOfThePage(2);
    };

    const HandleCloseDeletePage = () => {
        setUpdate();
        setOpenModalDeletePage(false);
        SetIndexOfThePage(0);
    };

    const router = useRouter();
    const editPageCtx = useContext(EditPageContext);

    return (
        <>
            {IndexOfThePage === 0 && (
                <>
                    {head_data && body_data && (
                        <div className={style.TableBase}>
                            <div className={style.TableHeadBox}>
                                {head_data.map((tr) => {
                                    return (
                                        <>
                                            {!isPreview && (
                                                <>
                                                    {Title && (
                                                        <div className={style.TableBaseRow}>
                                                            <h3>{Title}</h3>
                                                        </div>
                                                    )}
                                                    {Description && (
                                                        <div className={style.TableBaseRow}>
                                                            <i>{Description}</i>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {!isPreview && (
                                                <div className={style.TableBaseRow} style={{ marginTop: "20px" }}>
                                                    {tr.col.map((th) => {
                                                        return <div className={style.TableBaseHeader}>{th.label}</div>;
                                                    })}
                                                </div>
                                            )}

                                            {isPreview && (
                                                <div className={style.TableBaseRow} style={{ marginTop: "20px" }}>
                                                    {tr.col.map((th) => {
                                                        if (th.label != "Edit") return <div className={style.TableBaseHeader}>{th.label}</div>;
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    );
                                })}
                            </div>

                            <div className={style.TableBodyBox}>
                                {body_data.map((tr, index) => {
                                    const cellTd = [tr._id, tr.Nome, tr.Link, tr.MinRole, tr.RelatedSections];
                                    return (
                                        <div className={index % 2 == 0 ? style.TableBaseRowWhite : style.TableBaseRowBlue}>
                                            {cellTd.map((td) => {
                                                return <div className={style.TableBaseCell}>{td}</div>;
                                            })}
                                            {!isPreview && (
                                                <>
                                                    <div className={style.TableBaseCell}>
                                                        <button
                                                            className={style.TabIconBtn}
                                                            onClick={() => {
                                                                setOpenModalNewPage(true);
                                                                SetIndexOfThePage(1);
                                                                setEditPageId(cellTd[0]);
                                                                editPageCtx.setEditPage({
                                                                    id: cellTd[0],
                                                                    name: cellTd[1],
                                                                    link: cellTd[2],
                                                                    role: cellTd[3],
                                                                    relatedSections: cellTd[4],
                                                                });
                                                            }}
                                                            title={"Edit"}
                                                        >
                                                            <BsFillPencilFill></BsFillPencilFill>
                                                        </button>
                                                        <button
                                                            className={style.TabIconBtn}
                                                            onClick={() => {
                                                                router.push("/renderData/" + cellTd[2]);
                                                            }}
                                                            title={"Preview"}
                                                        >
                                                            <MdPreview></MdPreview>
                                                        </button>
                                                        <button
                                                            className={style.TabIconBtn}
                                                            onClick={() => {
                                                                HandleOpenDeletePage();
                                                                setEditPageId(cellTd[0]);
                                                                setActiveName(cellTd[1]);
                                                            }}
                                                            title={"Delete"}
                                                        >
                                                            <FaRegTrashAlt></FaRegTrashAlt>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {!isPreview && footer_action && (
                                <div className={style.TableEndRow}>
                                    <button className={style.buttonAdd} onClick={footer_action}>
                                        Aggiungi
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
            {IndexOfThePage === 1 && <NewPageModal isOpen={openModalNewPage} onActionCloseModal={HandleCloseNewPage} id={editPageId}></NewPageModal>}
            {IndexOfThePage === 2 && (
                <DeletePageModal isOpen={openModalDeletePage} onActionCloseModal={HandleCloseDeletePage} id={editPageId} name={activeName}></DeletePageModal>
            )}
        </>
    );
}
