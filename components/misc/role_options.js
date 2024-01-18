import { useState, useEffect } from "react";
import style from "../../styles/modal.module.css";

export default function RoleOptions({ selectedRole, setSelectedRole }) {
    const [roles, setRoles] = useState([]);

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    useEffect(() => {
        async function fetchRoles() {
            const response = await fetch("http://localhost:3000/api/roles");
            const roles = await response.json();
            setRoles(roles);
        }

        fetchRoles();
    }, []);

    return (
        <div className={style.ModalField}>
            <label>Ruolo</label>
            <br />
            <select className={style.SelectModern} value={selectedRole} onChange={handleRoleChange}>
                <option value="">Ruolo</option>
                {roles.map((role) => (
                    <option key={role.roleID} value={role.roleName}>
                        {role.roleName}
                    </option>
                ))}
            </select>
        </div>
    );
}
