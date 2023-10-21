import IconSelector from "../IconSelector";
import style from "../../styles/misc.module.scss";

export default function PopupSimple({
    _IconSelector,
    Status,
    additionalInfo,
    duration = 2000,
}) {
    let classForStatus;

    if (Status == popup_status_ok()) {
        classForStatus = style.PopUp_Container_Green;
    } else if (Status == popup_status_error()) {
        classForStatus = style.PopUp_Container_Error;
    } else if (Status == popup_status_warning()) {
        classForStatus = style.PopUp_Container_Warning;
    } else {
        classForStatus = style.PopUp_Container;
    }

    return (
        <div className={classForStatus}>
            <p>
                <IconSelector IconSelector={_IconSelector}></IconSelector>
                {additionalInfo}
            </p>
        </div>
    );
}

export const popup_status_ok = () => {
    return "ok";
};

export const popup_status_error = () => {
    return "error";
};

export const popup_status_warning = () => {
    return "warning";
};
