// components/Tabs.js

import React, { useState } from "react";

export default function Tabs({ data }) {
    const [activeTab, setActiveTab] = useState(data[0].label);

    return (
        <div>
            <div className="tabs">
                {data.map((tab, index) => (
                    <button
                        key={index}
                        className={activeTab === tab.label ? "active" : ""}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {data.map((tab, index) => (
                    <div
                        key={index}
                        className={
                            activeTab === tab.label ? "active" : "hidden"
                        }
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
            <style jsx>{`
                .tabs {
                    display: flex;
                    border-bottom: 1px solid #ccc;
                }
                .tabs button {
                    padding: 10px 15px;
                    cursor: pointer;
                    border: none;
                    background-color: transparent;
                    border-bottom: 2px solid transparent;
                    transition: border-color 0.3s;
                }
                .tabs button:hover {
                    border-bottom-color: #0070f3;
                }
                .tabs button.active {
                    border-bottom-color: #0070f3;
                }
                .tab-content > div {
                    display: none;
                }
                .tab-content > div.active {
                    display: block;
                }
            `}</style>
        </div>
    );
}
