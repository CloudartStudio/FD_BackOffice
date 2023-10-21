// components/BarChart.js
import { useState } from "react";
import BarChart from "@/components/data_component/charts/BarChart";

export default function BarChart() {
    const [_labels, set_labels] = useState([
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
    ]);
    const [_Data, set_Data] = useState([12, 19, 3, 5, 2]);
    const [_colors, set_colors] = useState([
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
    ]);

    return (
        <>
            <div>
                <div></div>
                <div>
                    <BarChart
                        Labels={[
                            "Gennaio",
                            "Febbraio",
                            "Marzo",
                            "Aprile",
                            "Maggio",
                        ]}
                        Data={_Data}
                        colors={_colors}
                    />
                </div>
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
        </>
    );
}
