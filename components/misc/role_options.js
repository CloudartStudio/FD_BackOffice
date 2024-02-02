import { useState, useEffect } from "react";
import style from "../../styles/modal.module.css";

export default function RoleOptions({ selectedRole, setSelectedRole }) {
    const [roles, setRoles] = useState([]);

    const handleRoleChange = (e) => {
        alert(e.target.value);
        setSelectedRole(e.target.value);
    };

    useEffect(() => {
        async function fetchRoles() {
            const response = await fetch("http://localhost:3000/api/roles");
            const roles = await response.json();
            console.log("roles", roles);
            setRoles(roles);
        }

        fetchRoles();
    }, []);

    return (
        <div className={style.ModalField}>
            <label>Ruolo</label>
            <br />
            <select className={style.SelectModern} value={selectedRole} onChange={handleRoleChange}>
                {roles.map((role) => (
                    <option key={role.roleID} value={role.roleID}>
                        {role.roleName}
                    </option>
                ))}
            </select>
        </div>
    );
}
