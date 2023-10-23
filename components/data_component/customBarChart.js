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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function CustomBarChart({ Graph }) {
    console.log("Graph", Graph);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: Graph.Name,
            },
        },
    };

    return (
        <span>
            {Graph &&
                Graph.Bars.map((b, index) => {
                    console.log("b", b);
                    // const data = {
                    //     labels: b.map((bars) => {
                    //         b.Label;
                    //     }),
                    //     datasets: [
                    //         {
                    //             label: b.Label,
                    //             data: b.map(() => 550),
                    //             backgroundColor: Graph.HexColor,
                    //         },
                    //     ],
                    // };
                    return <Bar options={options} data={data} />; //TODO -> VA INGLOBATO IN UN COMPONENTE
                })}
        </span>
    );
}
