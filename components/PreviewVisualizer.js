import style from "../styles/queryeditor.module.css";
import st from "../styles/visualizer.module.css";
import IconSelector from "./IconSelector";

const PreviewVisualizer = ({ GraphDataContainer }) => {
    //CAMPI PER VISUALIZER MODEL
    // IconID - string - static
    // Label1 - array - dinamic
    // Info - array - dinamic
    // ValueInfo - array - dinamic
    // Value - array - dinamic
    // backgroundColor - static
    // borderColor - static

    const data = {
        datasets: GraphDataContainer.map((GraphData) => {
            console.log("GraphData", GraphData);
            return {
                IconID: GraphData.find((el) => el.coordinate === "IconID").data,
                Label1: GraphData.find((el) => el.coordinate === "Label1").data,
                Info: GraphData.find((el) => el.coordinate === "Info").data,
                ValueInfo: GraphData.find((el) => el.coordinate === "ValueInfo").data,
                Value: GraphData.find((el) => el.coordinate === "Value").data,
                backgroundColor:
                    GraphData.find((el) => el.coordinate === "backgroundColor").data != "RANDOM"
                        ? GraphData.find((el) => el.coordinate === "backgroundColor").data + "a2"
                        : GraphData.find((el) => el.coordinate === "Value").data.map((c) => "#" + randomHexColor() + "a2"),
                borderColor:
                    GraphData.find((el) => el.coordinate === "borderColor").data != "RANDOM"
                        ? GraphData.find((el) => el.coordinate === "borderColor").data + "f1"
                        : GraphData.find((el) => el.coordinate === "Value").data.map((c) => "#" + randomHexColor() + "f1"),
            };
        }),
    };

    console.log("data", data);

    return (
        <div className={st.VisualizerContainer}>
            {data.datasets.map((el) => {
                return (
                    <div className={st.Visualizer}>
                        <span className={st.Icon}>
                            <IconSelector IconSelector={el.IconID}></IconSelector>
                        </span>
                        <div className={st.VisualizerBody}>
                            <div className={st.Title}>{el.Label1}</div>
                            {el.Info && <div className={st.Info}>{el.Info}</div>}
                            <div className={st.Value}>
                                {(!el.Value && (
                                    <span>
                                        <IconSelector IconSelector={"wait"}></IconSelector>
                                    </span>
                                )) || (
                                    <span>
                                        {el.Value} {el.ValueInfo}
                                    </span>
                                )}
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                );
            })}
        </div>
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

export default PreviewVisualizer;
