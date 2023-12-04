import style from "../../styles/graph.module.css";
import CustomBarChart from "./CustomBarChart";

export default function Datacharts({ ConfigData }) {
    return (
        <div className={style.ChartSection}>
            {ConfigData &&
                ConfigData.map((v, index) => {
                    return <CustomBarChart Graph={v} key={index}></CustomBarChart>;
                })}
        </div>
    );
}
