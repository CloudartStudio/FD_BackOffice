class GraphBaseDataSet {
    GetPropArray(id) {
        try {
            let updateString = "";
            const properties = Object.keys(this);
            for (const key of properties) {
                if (key !== "tableName" && key !== "ID") {
                    keyString += `${key}, `;
                    switch (typeof this[key]) {
                        case "string":
                            updateString += `'${this[key]}', `;
                            break;
                        case "boolean":
                            this[key] ? (updateString += `1, `) : (updateString += `0, `);
                            break;
                        default:
                            updateString += `${this[key]}, `;
                            break;
                    }
                }
            }
            updateString = updateString.slice(0, -2); // Remove the trailing comma and space
            keyString = keyString.slice(0, -2); // Remove the trailing comma and space
        } catch (error) {
            throw error;
        }
    }
}

export default GraphBaseDataSet;
