import React from "react";

const SelectInput = ({ labelInfo, type, QuerySelectField, SetQuerySelectField }) => {
    return (
        <div>
            <label>{labelInfo}</label>
            <input type={type}>{QuerySelectField.name}</input>
        </div>
    );
};

export default SelectInput;
