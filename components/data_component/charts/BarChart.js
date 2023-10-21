// components/BarChart.js

import { Bar } from "react-chartjs-2";
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// export default function RichiediPreventivoModale({
//     isOpen,
//     onActionCloseModal,
// })

export default function BarChart({ labels, Data, colors }) {
    console.log(labels);
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Vendite mensili",
                data: Data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}
