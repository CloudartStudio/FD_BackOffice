import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ModernLayout from "../components/layout/modernLayout";
import { NotificationContextProvider } from "../context/notificationContext";
import { EditPageContextProvider } from "../context/editPageContext";
import { BreadCrumbContextProvider } from "../context/breadcrumbContext";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <BreadCrumbContextProvider>
                <EditPageContextProvider>
                    <NotificationContextProvider>
                        <ModernLayout>
                            <Component {...pageProps} />
                        </ModernLayout>
                    </NotificationContextProvider>
                </EditPageContextProvider>
            </BreadCrumbContextProvider>
        </SessionProvider>
    );
}
