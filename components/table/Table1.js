import style from "../../styles/table.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import NewPageModal from "../../components/modal/NewPageModal";
import React, { useState, useEffect, useRef } from "react";
export default function Table1({ head_data, body_data, footer_action, row_actions, isPreview, Title = null, Description = null }) {
    const [openModalNewPage, setOpenModalNewPage] = useState(false);
    const [editPageId, setEditPageId] = useState("");
    const HandleCloseNewPage = () => {
        setOpenModalNewPage(false);
    };

    return (
        <>
            <NewPageModal isOpen={openModalNewPage} onActionCloseModal={HandleCloseNewPage} id={editPageId}></NewPageModal>
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
                                            {footer_action && (
                                                <div className={style.TableEndRow}>
                                                    <button className={style.buttonAdd} onClick={footer_action}>
                                                        Aggiungi
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className={style.TableBaseRow}>
                                        {tr.col.map((th) => {
                                            return <div className={style.TableBaseHeader}>{th.label}</div>;
                                        })}
                                    </div>
                                </>
                            );
                        })}
                    </div>

                    <div className={style.TableBodyBox}>
                        {body_data.map((tr, index) => {
                            console.log("TR", tr);
                            const cellTd = [tr._id, tr.Nome, tr.Link, tr.MinRole];
                            return (
                                <div className={index % 2 == 0 ? style.TableBaseRowWhite : style.TableBaseRowBlue}>
                                    {cellTd.map((td) => {
                                        return <div className={style.TableBaseCell}>{td}</div>;
                                    })}
                                    <div className={style.TableBaseCell}>
                                        <button
                                            className={style.TabIconBtn}
                                            onClick={() => {
                                                setOpenModalNewPage(true);
                                                setEditPageId(cellTd[0]);
                                            }}
                                            title={"Edit"}
                                        >
                                            <BsFillPencilFill></BsFillPencilFill>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
