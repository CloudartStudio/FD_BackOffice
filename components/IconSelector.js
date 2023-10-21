import {
    RiMenu2Fill,
    RiMenu3Fill,
    RiMoneyEuroBoxFill,
    RiAddLine,
    RiEdit2Line,
    RiInformationFill,
    RiPagesFill,
} from "react-icons/ri";

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
        case "wait":
            return <p>attendi</p>;
    }
}
