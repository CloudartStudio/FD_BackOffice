import { createContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const BreadCrumbContext = createContext({
    BreadCrumb: [],
    ForwardBreadCrumb: [],
    goBack: function () {},
    goForward: function () {},
    goHome: function () {},
    addToBreadCrumb: function () {},
});

//funziona così BC:
//quando vai su home page -> resetBreadCrumb
//quando vai su pagina aggiungi a breadcrumb per poter tornare indietro
//se torni indietro dopo puoi tornare avanti
//se quando torni indietro il bread crumb carica una coda futura
//se la pagina che viene renderizzata ha url come pagina successiva in coda ok, sennò la coda viene resettata
//se torni avanti si rimuove dalla dalla coda avanti

export function BreadCrumbContextProvider(props) {
    const [breadCrumb, setBreadCrumb] = useState([]);
    const [forwardBreadCrumb, setForwardBreadCrumb] = useState([]);
    const router = useRouter();

    function addToBreadCrumb(PageInfoData) {
        if (PageInfoData === "/") {
            resetBreadCrumb();
        } else {
            setBreadCrumb((prev) => {
                if (prev[prev.length - 1] === PageInfoData) return prev;
                return [...prev, PageInfoData];
            });
        }
    }

    function resetBreadCrumb() {
        setBreadCrumb((prev) => []);
    }

    function goBack() {
        if (breadCrumb.length > 0) {
            const backTo = breadCrumb[breadCrumb.length - 2];
            if (breadCrumb.length > 0) {
                setForwardBreadCrumb((prev) => {
                    return [...prev, breadCrumb[breadCrumb.length - 1]];
                });
                setBreadCrumb((prev) => prev.slice(0, prev.length - 1));
            }

            router.push(backTo ? backTo : "/");
        }
    }

    function goForward() {
        if (forwardBreadCrumb.length > 0) {
            const forwardTo = forwardBreadCrumb[forwardBreadCrumb.length - 1];
            setBreadCrumb((prev) => {
                return [...prev, forwardTo];
            });
            setForwardBreadCrumb((prev) => prev.slice(0, prev.length - 1));
            router.push(forwardTo ? forwardTo : "/");
        }
    }

    function goHome() {
        setBreadCrumb("/");
    }

    const context = {
        BreadCrumb: breadCrumb, //bread crumb per tutti
        ForwardBreadCrumb: forwardBreadCrumb, //bread crumb per tutti
        goBack: goBack,
        goForward: goForward,
        goHome: goHome,
        addToBreadCrumb: addToBreadCrumb,
    };

    return <BreadCrumbContext.Provider value={context}>{props.children}</BreadCrumbContext.Provider>;
}

/*
{
                                                                    id: cellTd[0],
                                                                    name: cellTd[1],
                                                                    link: cellTd[2],
                                                                    role: cellTd[3],
                                                                    relatedSections: JSON.stringify(cellTd[4]),
                                                                }
*/

export default BreadCrumbContext;
