import style from "../../styles/modal.module.css";
import React, { useState, useEffect, useRef } from "react";
import MenuSquare from "../../components/menu/MenuSection";

export default function MenuSection({ baseSection, PrevLevel, verticalOrder }) {
    const [menuData, setMenuData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const HaveMoreLocationsRef = useRef(null);
    const [showMultipleAddresses, setShowMultipleAddresses] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3000/api/getMenuReferedItem/" + baseSection.ID
            );
            const data = await response.json();
            setMenuData(data);
        };
        fetchData();
    }, []);

    const handleCheckboxChange = () => {
        setShowMultipleAddresses(HaveMoreLocationsRef.current.checked);
    };

    const handleOpenSubMenu = () => {
        setIsOpen(isOpen ? false : true);
    };

    return (
        <>
            <li>
                {baseSection.IsLeft && (
                    <a
                        onClick={handleOpenSubMenu}
                        href={"renderData/" + baseSection.Link}
                        style={{
                            left: `${PrevLevel * 13 + 1}dvw`,
                            top: `${verticalOrder * 70 + 30}px`,
                            backgroundColor: `${
                                isOpen ? "#53c6fb" : "#004aad"
                            }`,
                        }}
                    >
                        {baseSection.Label}
                    </a>
                )}

                {!baseSection.IsLeft && (
                    <a
                        onClick={handleOpenSubMenu}
                        href={"/" + baseSection.Link}
                        style={{
                            right: `${PrevLevel * 13 + 1}dvw`,
                            top: `${verticalOrder * 70 + 30}px`,
                            backgroundColor: `${
                                isOpen ? "#53c6fb" : "#004aad"
                            }`,
                        }}
                    >
                        {baseSection.Label}
                    </a>
                )}
            </li>
            {isOpen && (
                <>
                    <div className={style.ModalContainer}></div>
                    {menuData.map((m, index) => (
                        <MenuSection
                            verticalOrder={index + 1}
                            baseSection={m}
                            PrevLevel={parseInt(PrevLevel) + 1}
                        ></MenuSection>
                    ))}
                </>
            )}
        </>
    );
}
