import style from "../../styles/graph.module.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CustomBarChart({ Graph }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const labels = Graph.Bars.map((b) => b.Label);
            const dataValues = await Promise.all(
                Graph.Bars.map(async (b, index) => {
                    try {
                        const response = await axios.post("http://localhost:3000/api/query/GraphSimpleSelect", {
                            ConfigID: Graph._id,
                            GraphID: index,
                        });
                        return response.data[b.ReturnName]; // o un valore predefinito se necessario
                    } catch (error) {
                        return 0; // Gestisci errori o fornisci un valore di fallback
                    }
                })
            );

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Value",
                        data: dataValues,
                        backgroundColor: Graph.Bars.map((b) => b.Color), //["#ff00df", "#ffffcc", "#ccffee"],
                    },
                ],
            };

            const options = {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: Graph.Name, color: "#FFFFFF" },
                },
                scales: {
                    x: { ticks: { color: "#FFFFFF" }, grid: { color: "#FFFFFF" } },
                    y: { ticks: { color: "#FFFFFF" }, grid: { color: "#FFFFFF" } },
                },
            };

            setData({ chartData, options });
        };

        fetchData();
    }, [Graph]); // Aggiungi Graph qui se il componente deve reagire ai suoi cambiamenti

    return (
        <>
            {data && (
                <div className={style.chartContainer}>
                    <Bar options={data.options} data={data.chartData} />
                </div>
            )}
        </>
    );
}
