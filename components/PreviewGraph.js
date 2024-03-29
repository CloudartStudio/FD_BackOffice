import {
    Chart as ChartJS,
    ArcElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import style from "../styles/queryeditor.module.css";
import { useState } from "react";

ChartJS.register(RadialLinearScale, ArcElement, LinearScale, BarElement, CategoryScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PreviewGraph = ({ isXAxis, legendTop, graphName, hide = false, GraphDataContainer }) => {
    const [graphType, setGraphType] = useState(0);
    const options = {
        indexAxis: isXAxis ? "x" : "y", //x/y axis MOLTO FIGO
        responsive: true,
        plugins: {
            legend: {
                position: legendTop ? "top" : "bottom",
            },
            title: {
                display: !hide,
                text: graphName,
            },
        },
    };

    const labels = GraphDataContainer[0].find((el) => el.coordinate === "Labels").data;

    //CAMPI PER QUERY MODEL
    // labelDataSet - string - static
    // Labels - array - dinamic
    // GraphData - array - dinamic
    // backgroundColor - static
    // borderColor - static

    const data = {
        labels,
        datasets: GraphDataContainer.map((GraphData) => {
            return {
                label: GraphData.find((el) => el.coordinate === "labelDataSet").data,
                data: GraphData.find((el) => el.coordinate === "GraphData").data,
                backgroundColor:
                    GraphData.find((el) => el.coordinate === "backgroundColor").data != "RANDOM"
                        ? GraphData.find((el) => el.coordinate === "backgroundColor").data + "a2"
                        : GraphData.find((el) => el.coordinate === "GraphData").data.map((c) => "#" + randomHexColor() + "a2"),
                borderColor:
                    GraphData.find((el) => el.coordinate === "borderColor").data != "RANDOM"
                        ? GraphData.find((el) => el.coordinate === "borderColor").data + "f1"
                        : GraphData.find((el) => el.coordinate === "GraphData").data.map((c) => "#" + randomHexColor() + "f1"),
                borderWidth: 1,
                borderRadius: 3,
                borderSkipped: false,
            };
        }),
    };

    console.log("data", data);
    //console.log("data1", data1);

    return (
        <>
            <select
                className={style.Select}
                value={graphType}
                onChange={(e) => {
                    e.preventDefault();
                    setGraphType(parseInt(e.target.value));
                }}
            >
                <option value={0}>Grafico a barre</option>
                <option value={1}>Grafico linee</option>
                <option value={3}>Grafico a doughnut</option>
                <option value={4}>Grafico a torta</option>
                <option value={5}>Grafico a polare</option>
                <option value={7}>Grafico a radar</option>
            </select>

            {graphType === 0 && <Bar options={options} data={data} />}
            {graphType === 1 && <Line options={options} data={data} />}
            {graphType === 3 && <Doughnut options={options} data={data} />}
            {graphType === 4 && <Pie options={options} data={data} />}
            {graphType === 5 && <PolarArea options={options} data={data} />}
            {graphType === 7 && <Radar options={options} data={data} />}
        </>
    );
};

function randomHexColor() {
    const min = 50;
    const max = 205;

    function componenteEsadecimale(valore) {
        const esadecimale = valore.toString(16);
        return esadecimale.length == 1 ? "0" + esadecimale : esadecimale;
    }

    const rosso = Math.floor(Math.random() * (max - min + 1)) + min;
    const verde = Math.floor(Math.random() * (max - min + 1)) + min;
    const blu = Math.floor(Math.random() * (max - min + 1)) + min;

    return componenteEsadecimale(rosso) + componenteEsadecimale(verde) + componenteEsadecimale(blu);
}

export default PreviewGraph;
