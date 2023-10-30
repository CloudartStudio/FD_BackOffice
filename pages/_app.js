import "../styles/globals.css";
//import Layout from "../components/layout/layout";
import ModernLayout from "../components/layout/modernLayout";

export default function MyApp({ Component, pageProps }) {
    return (
        <ModernLayout>
            <Component {...pageProps} />
        </ModernLayout>
    );
}
