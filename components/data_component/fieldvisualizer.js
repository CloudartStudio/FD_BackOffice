import style from "../../styles/graph.module.css";
import Visualizer from "./visualizer";

export default function FieldVisualizer({ ConfigData }) {
    return (
        <div className={style.GraphSection}>
            {ConfigData &&
                ConfigData.map((v, index) => {
                    return <Visualizer key={index} visualizerData={v}></Visualizer>;
                })}
        </div>
    );
}
