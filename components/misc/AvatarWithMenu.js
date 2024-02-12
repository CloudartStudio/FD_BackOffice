import style from "../../styles/misc.module.scss";
import LogoutButton from "../../components/layout/logoutBtn";
import { useState } from "react";
import { useSession } from "next-auth/react"

export default function AvatarWithMenu({ name }) {
	const nameParts = name.split(" ");
	const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
	const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

    const { data: _session } = useSession();

	console.log('session: ', _session)
    return (
        <div className={style.avatar_section}>
            <div className={style.avatar}>
                <span>
                    {firstNameInitial}
                    {lastNameInitial}
                </span>
            </div>

			{/* condizione per apparire il menu  */}
			{ (
				<div className={style.avatar_menu}>
					<ul>
						<li>Nome</li>
						<li>Ruolo</li>
						<li>Ragione Sociale</li>
						<LogoutButton>Logout</LogoutButton>
					</ul>
				</div>
			)}
        </div>
    );
}
