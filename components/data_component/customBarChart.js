import style from "../../styles/graph.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ["January", "February"];

export default function CustomBarChart({ Graph }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Graph.Name",
                color: "#FFFFFF",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#FFFFFF",
                },
                grid: {
                    color: "#FFFFFF",
                },
            },
            y: {
                ticks: {
                    color: "#FFFFFF",
                },
                grid: {
                    color: "#FFFFFF",
                },
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "b.Label", // Corretto da "b.Label" a b.Label
                data: labels.map(() => 550),
                backgroundColor: labels.map(() => "#FFFFFFbb"),
            },
        ],
    };

    return (
        <span>
            {Graph &&
                Graph.Bars.map((b, index) => {
                    return (
                        <div className={style.chartContainer}>
                            <Bar options={options} data={data} />
                        </div>
                    );
                })}
        </span>
    );
}
