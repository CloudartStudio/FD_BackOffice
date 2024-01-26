import style from "../../styles/modal.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MenuSquare from "../../components/menu/MenuSection";

export default function MenuSection({ baseSection, PrevLevel, verticalOrder }) {
    const [menuData, setMenuData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/getMenuReferedItem/" + baseSection.ID);
            const data = await response.json();
            setMenuData(data);
        };
        fetchData();
    }, []);

    const handleOpenSubMenu = () => {
        if (baseSection.HaveSubPage) {
            setIsOpen(isOpen ? false : true);
        } else {
            router.push("/renderData/" + baseSection.Link);
        }

        //{"/" + baseSection.Link}
    };

    return (
        <>
            {!baseSection.IsAgenzia && (
                <li
                    style={{
                        backgroundColor: `${isOpen ? "#f3c6fb" : "transparent"}`,
                    }}
                >
                    <a onClick={handleOpenSubMenu} href={"renderData/" + baseSection.Link}>
                        {baseSection.Nome}
                    </a>
                </li>
            )}

            {baseSection.IsAgenzia && (
                <li
                    style={{
                        backgroundColor: `${isOpen ? "#53c6fb" : "transparent"}`,
                    }}
                >
                    <a onClick={handleOpenSubMenu}>{baseSection.Nome}</a>
                </li>
            )}

            {/* {isOpen && (
                <>
                    <div className={style.ModalContainer}></div>
                    {menuData.map((m, index) => (
                        <MenuSection verticalOrder={index + 1} baseSection={m} PrevLevel={parseInt(PrevLevel) + 1}></MenuSection>
                    ))}
                </>
            )} */}
        </>
    );
}
