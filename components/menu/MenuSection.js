import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MenuSection({ baseSection, PrevLevel, verticalOrder }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleOpenSubMenu = () => {
        if (baseSection.HaveSubPage) {
            setIsOpen(isOpen ? false : true);
        } else {
            router.push("/renderData/" + baseSection.page.Link);
        }
    };

    return (
        <>
            {baseSection.subPages && (
                <>
                    {baseSection.subPages.length == 0 && (
                        <li
                            style={{
                                backgroundColor: `#ffffff1f`,
                            }}
                        >
                            <span onClick={handleOpenSubMenu}>{baseSection.page.Nome}</span>
                        </li>
                    )}
                    {baseSection.subPages.length > 0 && (
                        <>
                            <SectionWithSubPages baseSection={baseSection} key={verticalOrder}></SectionWithSubPages>
                        </>
                    )}
                </>
            )}
        </>
    );
}

const SectionWithSubPages = ({ baseSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleWitchSubMenu = () => {
        setIsOpen(isOpen ? false : true);
    };

    const handleRequest = (e, uri) => {
        e.preventDefault();
        router.push(uri);
    };
    return (
        <>
            <li
                onClick={handleWitchSubMenu}
                style={{
                    backgroundColor: `#ffffff1f`,
                }}
            >
                <span>{baseSection.page.Nome}</span>
            </li>

            {isOpen && baseSection.page.Link && (
                <li
                    onClick={(e) => {
                        handleRequest(e, "/renderData/" + baseSection.page.Link);
                    }}
                    style={{
                        opacity: "0.9",
                        backgroundColor: `#ffffff9f`,
                    }}
                >
                    <span>{baseSection.page.Nome}</span>
                </li>
            )}
            {isOpen &&
                baseSection.subPages.map((item, index) => (
                    <li
                        onClick={(e) => {
                            handleRequest(e, "/renderData/" + baseSection.page.Link + "/" + item.Link);
                        }}
                        style={{
                            opacity: "0.9",
                            backgroundColor: `#ffffff9f`,
                        }}
                    >
                        <a>{item.Nome}</a>
                    </li>
                ))}
        </>
    );
};
