import IconSelector from "../IconSelector";
import style from "../../styles/misc.module.scss";

export default function PopupSimple({ notification }) {
    let classForStatus;

    if (notification.status == "success") {
        classForStatus = style.PopUp_Container_Green;
    } else if (notification.status == "error") {
        classForStatus = style.PopUp_Container_Error;
    } else if (notification.status == "warning") {
        classForStatus = style.PopUp_Container_Warning;
    }else if (notification.status == "waiting") {
        classForStatus = style.PopUp_Container_Waiting;
    } else {
        classForStatus = style.PopUp_Container;
    }

    return (
        <div className={classForStatus}>
            <div className={style.PopUp_StatusIcon}>
                <IconSelector IconSelector={notification.status}></IconSelector>
            </div>
            <div className={style.PopUp_StatusMsg}>
                <h5>{notification.title}</h5>
                <p>{notification.message}</p>
            </div>
        </div>
    );
}
