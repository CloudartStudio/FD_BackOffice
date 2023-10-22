import style from "../../styles/graph.module.css";
import IconSelector from "../../components/IconSelector";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Visualizer({ visualizerData }) {
    const [DataValue, SetDataValue] = useState("");

    useEffect(() => {
        const GetDataForSection = async () => {
            console.log("visualizerData", visualizerData);
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/query/SimpleSelect",
                    {
                        ConfigID: visualizerData._id,
                    }
                );
                SetDataValue(response.data[visualizerData.returnName]);
            } catch (err) {
                //TODO: LOGGER
                console.error("Si è verificato un errore:", err);
            }
        };

        GetDataForSection();
    }, []);

    return (
        <div className={style.GraphSectionSubSection}>
            <span>
                <IconSelector
                    IconSelector={visualizerData.IconID}
                ></IconSelector>
            </span>
            <div>
                <p>{visualizerData.Label1}</p>
                {visualizerData.Info && <i>{visualizerData.Info}</i>}
                <b>
                    {(!DataValue && (
                        <span>
                            <IconSelector IconSelector={"wait"}></IconSelector>
                        </span>
                    )) || (
                        <span>
                            {DataValue} {visualizerData.ValueInfo}
                        </span>
                    )}
                </b>
            </div>
        </div>
    );
}
