import style from "../../styles/graph.module.css";
import CustomBarChart from "./CustomBarChart";

export default function Datacharts({ ConfigData }) {
    return (
        <div className={style.GraphSection}>
            {ConfigData &&
                ConfigData.map((v, index) => {
                    console.log(v);
                    return (
                        <CustomBarChart Graph={v} key={index}></CustomBarChart>
                    );
                })}
        </div>
    );
}
