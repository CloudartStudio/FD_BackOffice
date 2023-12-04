import "../styles/globals.css";
//import Layout from "../components/layout/layout";
import ModernLayout from "../components/layout/modernLayout";
import { NotificationContextProvider } from "../context/notificationContext";
import { EditPageContextProvider } from "../context/editPageContext";
import { BreadCrumbContextProvider } from "../context/breadcrumbContext";

export default function MyApp({ Component, pageProps }) {
    return (
        <BreadCrumbContextProvider>
            <EditPageContextProvider>
                <NotificationContextProvider>
                    <ModernLayout>
                        <Component {...pageProps} />
                    </ModernLayout>
                </NotificationContextProvider>
            </EditPageContextProvider>
        </BreadCrumbContextProvider>
    );
}
