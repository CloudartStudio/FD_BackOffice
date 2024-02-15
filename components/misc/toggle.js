import style from "../../styles/misc.module.scss";

export default function toggle({ data, stato, setStato, children }) {

    return (
        <div>
            <p>{children}</p>
            <div className={style.toggle}>
                <div className={stato ? style.active : style.inactive} onClick={() =>{setStato()}}>{data[0].label}</div>
                <div className={!stato ? style.active : style.inactive} onClick={() =>{setStato()}}>{data[1].label}</div>
            </div>
        </div>
    );
}
