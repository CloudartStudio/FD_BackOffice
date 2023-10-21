import style from "../../styles/graph.module.css";
import Visualizer from "./visualizer";

export default function FieldVisualizer({ ConfigData, Link, SectionID }) {
    console.log("bella", ConfigData[0]);

    return (
        <div className={style.GraphSection}>
            {ConfigData &&
                ConfigData.map((v, index) => {
                    return (
                        <Visualizer
                            key={index}
                            visualizerData={v}
                            Link={Link}
                            SectionID={SectionID}
                        ></Visualizer>
                    );
                })}
        </div>
    );
}
