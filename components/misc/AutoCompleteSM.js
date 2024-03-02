import React, { useState, useEffect } from "react";

export default function useAutoCompleteSM({ newPartner, setOutValue, label }) {
    const [bufferValue, setBufferValue] = useState("");
    const [staticValues, setStaticValues] = useState([]);
    const [bufferValues, setBufferValues] = useState(staticValues);

    function checkClient(settore_merceologico) {
        settore_merceologico = "http://localhost:3000/api/";
        return settore_merceologico;  
    }

    useEffect(() => {
        async function fetchSM() {
            const url = checkClient(newPartner.settore_merceologico);
            const response = await fetch(url);
            const roles = await response.json();
            console.log("roles", roles);
            setStaticValues(prev => {
                const finalList = [];
                roles.map(r => {
                    const nuovoOggetto = {
                        key: r.settore_merceologico,
                        val: r.nome,
                    };

                    finalList.push(nuovoOggetto);
                })
                setBufferValues(finalList);
                return finalList;
            });
        }

        fetchSM();
    }, [newPartner.settore_merceologico]);

    return (
        <div>
            <label>{label}</label>

            <input
                type="text"
                onChange={(e) => {
                    const val = e.target.value; 
                    setBufferValue((prev) => val);
                    setBufferValues((prev) => {
                        const res = staticValues.filter((v) => v.key.toLowerCase().includes(val.toLowerCase())); // Confronto non case-sensitive
                        return res;
                    });
                }}
                value={bufferValue}
            />

            <div style={{
                backgroundColor: "#ffffff3f",
                marginTop: "10px",
                width:"91%",
                borderRadius:"5px",
                padding:"5px",
                height:"10vh",
                overflowY:"scroll"
            }}>
                {bufferValues &&
                    bufferValues.map((BValue) => {
                    console.log("BValue", BValue);
                    return (
                        <div
                            onClick={() => {
                            setOutValue(BValue.val); 
                            setBufferValue((prev) => BValue.key);
                        }}
                        >
                        {BValue.key}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
