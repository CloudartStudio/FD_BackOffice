import { RiMenu2Fill, RiMenu3Fill, RiMoneyEuroBoxFill, RiAddLine, RiEdit2Line, RiInformationFill, RiPagesFill } from "react-icons/ri";

import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { MdErrorOutline, MdOutlineDone } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";

export default function IconSelector({ IconSelector }) {
    switch (IconSelector) {
        case "EuroSumm":
            return <RiMenu2Fill></RiMenu2Fill>;
        case "EuroTag":
            return <RiMenu3Fill></RiMenu3Fill>;
        case "EuroAvg":
            return <RiMoneyEuroBoxFill></RiMoneyEuroBoxFill>;
        case "add":
            return <RiAddLine></RiAddLine>;
        case "edit":
            return <RiEdit2Line></RiEdit2Line>;
        case "info":
            return <RiInformationFill></RiInformationFill>;
        case "section":
            return <RiPagesFill></RiPagesFill>;
        case "FullScreen":
            return <AiOutlineFullscreen></AiOutlineFullscreen>;
        case "SmallScreen":
            return <AiOutlineFullscreenExit></AiOutlineFullscreenExit>;
        case "wait":
            return <CiClock2></CiClock2>;
        case "success":
            return <MdOutlineDone></MdOutlineDone>;
        case "error":
            return <MdErrorOutline></MdErrorOutline>;
        case "warning":
            return <IoMdWarning></IoMdWarning>;
    }
}
