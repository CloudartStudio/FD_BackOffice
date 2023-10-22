import style from "../../styles/graph.module.css";
import Visualizer from "./visualizer";

export default function FieldVisualizer({ ConfigData }) {
    console.log("ConfigData", ConfigData);
    return (
        <div className={style.GraphSection}>
            {ConfigData &&
                ConfigData.map((v, index) => {
                    console.log(v);
                    return (
                        <Visualizer key={index} visualizerData={v}></Visualizer>
                    );
                })}
        </div>
    );
}
