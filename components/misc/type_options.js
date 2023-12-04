import { useState, useEffect } from "react";
import style from "../../styles/modal.module.css";

export default function TypeOptions({ selectedTypes, setSelectedTypes }) {
    const [types, setTypes] = useState([]);

    const handleTypeChange = (e) => {
        setSelectedTypes(e.target.value);
    };

    useEffect(() => {
        async function fetchTypes() {
            const response = await fetch("http://localhost:3000/api/types");
            const t = await response.json();
            setTypes(t);
        }

        fetchTypes();
    }, []);

    return (
        <div className={style.ModalField}>
            <select className={style.SelectModern} value={selectedTypes} onChange={handleTypeChange}>
                <option value="">Select a type</option>
                {types.map((t) => (
                    <option key={t.typeID} value={t.typeName}>
                        {t.typeName}
                    </option>
                ))}
            </select>
        </div>
    );
}
