import style from "../../styles/table.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import { FaRegTrashAlt } from "react-icons/fa";
import NewPageModal from "../modal/NewPageModal";
import DeletePageModal from "../modal/DeletePageModal";
import React, { useState, useContext } from "react";
import EditPageContext from "../../context/editPageContext";

export default function TablePartner({ head_data, body_data, footer_action, isPreview }) {
    return (
        <>
            {head_data && body_data && (
                <div className={style.TableBase}>
                    <div className={style.TableHeadBox}>
                        {head_data.map((tr) => {
                            return (
                                <>
                                    {isPreview && (
                                        <div className={style.TableBaseRow}>
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
                            const cellTd = [tr.ID, tr.ragione_sociale, tr.partita_iva, tr.codice_sdi, tr.telefono, tr.email, tr.indrizzo_sede_fisica];
                            return (
                                <div className={index % 2 == 0 ? style.TableBaseRowWhite : style.TableBaseRowBlue}>
                                    {cellTd.map((td) => {
                                        return <div className={style.TableBaseCell}>{td}</div>;
                                    })}
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
    );
}
