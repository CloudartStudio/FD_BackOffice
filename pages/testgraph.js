// // components/ChartComponent.js

// import { useEffect, useRef } from "react";
// import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
// import { Bar, Doughnut, Line, Pie, Bubble, PolarArea, Radar, Scatter } from "react-chartjs-2";

// ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// export const options = {
//     indexAxis: "x", //x/y axis MOLTO FIGO
//     responsive: true,
//     plugins: {
//         legend: {
//             position: "top",
//         },
//         title: {
//             display: true,
//             text: "Chart.js Bar Chart",
//         },
//     },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: "Dataset 1",
//             data: labels.map(() => Math.floor(Math.random() * 100) - 65),
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//             borderColor: "rgba(255, 99, 132, 1)",
//             borderWidth: 2,
//             borderRadius: 10,
//             borderSkipped: false,
//         },
//         {
//             label: "Dataset 2",
//             data: labels.map(() => Math.floor(Math.random() * 100) - 10),
//             backgroundColor: "rgba(53, 162, 235, 0.5)",
//         },
//     ],
// };

// function ChartComponent() {
//     //return <Bar options={options} data={data} />;
//     return <Doughnut options={options} data={data} />;
// }

// export default ChartComponent;
