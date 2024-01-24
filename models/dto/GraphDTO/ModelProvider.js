import DataModel_Visualizer from "../GraphDTO/DataModel_Visualizer";
import DataModel_GraphLabel from "../GraphDTO/DataModel_GraphLabel";

const ModelProvider = (TypeId) => {
    if (TypeId === 1) return new DataModel_Visualizer();
    else if (TypeId === 0) return new DataModel_GraphLabel();
    else return [];
};

export default ModelProvider;
