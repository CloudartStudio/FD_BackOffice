import React, { useRef, useState, useEffect } from "react";

export default function useAutoComplete({ singleSell, setOutValue, label }) {
    const [bufferValue, setBufferValue] = useState("");
    const [staticValues, setStaticValues] = useState([]);
    const [bufferValues, setBufferValues] = useState(staticValues);

    function checkClient(is_b2b) {
        return is_b2b ? "http://localhost:3000/api/auth/account/cliente/b2b" : "http://localhost:3000/api/auth/account/cliente/b2c"; 
    }

    useEffect(() => {
        async function fetchRoles() {
            const url = checkClient(singleSell.is_b2b);
            const response = await fetch(url);
            const roles = await response.json();
            console.log("roles", roles);
            setStaticValues(prev => {
                const finalList = [];
                roles.map(r => {
                    const nuovoOggetto = {
                        key: r.ragione_sociale ? r.ragione_sociale : r.nome + " " + r.cognome,
                        val: r.ID,
                    };

                    finalList.push(nuovoOggetto);
                })
                setBufferValues(finalList);
                return finalList;
            });
        }

        fetchRoles();
    }, [singleSell.is_b2b]);

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
