import style from "../../styles/misc.module.scss";
import LogoutButton from "../../components/layout/logoutBtn";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AvatarWithMenu({ name }) {
    const { data: _session } = useSession();

	const [ isShown, setIsShown ] = useState(false);


	console.log('session: ', _session)
    return (
        <div className={style.avatar_section}>
            <div onClick={() => { setIsShown(!isShown); }} className={style.avatar}>
				{_session.user.email.ID_ruolo === 1 &&  <span>
                    {_session.user.email.admin.email[0]}
                </span>}
				{_session.user.email.ID_ruolo === 3 &&  <span>
                    {_session.user.email.partener.email[0]}
                </span>}
            </div>

			{/* condizione per apparire il menu  */}
			{isShown && (
				<div className={style.avatar_menu}>
					{_session.user.email.ID_ruolo === 1 && (
						<ul>
							<li>{_session.user.email.admin.ruolo}</li>
							<li>{_session.user.email.admin.email}</li>
							<LogoutButton>Logout</LogoutButton>
						</ul>
					)}

					{_session.user.email.ID_ruolo === 3 && (
						<ul>
							<li>{_session.user.email.partener.ragione_sociale}</li>
							<li>{_session.user.email.partener.ruolo}</li>
							<li>{_session.user.email.partener.email}</li>
							<LogoutButton>Logout</LogoutButton>
						</ul>
					)}
				</div>
			)}
        </div>
    );
}
