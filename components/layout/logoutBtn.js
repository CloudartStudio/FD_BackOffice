import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";

function LogoutButton() {
    const handleLogout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" });

        if (data.error) {
            console.error("Logout error:", data.error);
        } else {
            console.log("Logout successful");
            // Puoi aggiungere altre azioni post-logout se necessario
        }
    };

    return (
        <span onClick={handleLogout}>
            <RiLogoutCircleRLine></RiLogoutCircleRLine>
        </span>
    );
}

export default LogoutButton;
