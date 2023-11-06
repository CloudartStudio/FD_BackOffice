// components/Tabs.js
import style from "../../styles/tabs.module.css";
import React, { useState } from "react";

export default function Tabs({ data }) {
    const [activeTab, setActiveTab] = useState(data[0].label);

    return (
        <div className={style.tabContainer}>
            <div className={style.tabs}>
                {data.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === tab.label ? style.active : ""}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={style.tabcontent}>
                {data.map((tab, index) => (
                    <div
                        key={index}
                        className={
                            activeTab === tab.label
                                ? style.tabcontentActive
                                : style.tabcontentHidden
                        }
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
