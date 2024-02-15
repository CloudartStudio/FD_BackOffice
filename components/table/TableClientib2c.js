import style from "../../styles/table.module.css";
import React from "react";

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
                            const cellTd = [tr.ID, tr.nome + " " + tr.cognome, tr.data_nascita, tr.telefono, tr.email, tr.indirizzo_sede_fisica];
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
