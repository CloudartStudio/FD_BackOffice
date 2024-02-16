import style from "../../styles/modernlayout.module.css";
import MenuSection from "../../components/menu/MenuSection";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BreadCrumbContext from "../../context/breadcrumbContext";
import { useSession } from "next-auth/react";

const ModernMenu = ({ IsFullScreen }) => {
    const { data: _session, status } = useSession();
    const Router = useRouter();
    const BreadCrumbCtx = useContext(BreadCrumbContext);
    const [MenuData, setMenuData] = useState([]);

    useEffect(() => {
        Router.events.on("routeChangeComplete", (url, { shallow }) => {
            BreadCrumbCtx.addToBreadCrumb(url);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/menu")
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return [];
                });
            const data = await response.json();
            console.log(data);
            setMenuData(data);
        };
        fetchData();
    }, []);

    return (
        <div id="particles-js" className={style.menubase}>
            {!IsFullScreen && (
                <>
                    {status && status === "authenticated" && (
                        <nav>
                            <ul>
                                {MenuData &&
                                    MenuData.length > 0 &&
                                    MenuData.filter((item) => !item.page.IsAgenzia).map((item, index) => (
                                        <MenuSection verticalOrder={index + 1} PrevLevel={0} baseSection={item}></MenuSection>
                                    ))}
                            </ul>
                        </nav>
                    )}
                    {status && status === "authenticated" && (
                        <div className={style.CentralMenuContent}>
                            <div className={style.CentralTopSection}>
                                <div
                                    style={BreadCrumbCtx.BreadCrumb.length > 0 ? {} : { opacity: 0.1 }}
                                    onClick={BreadCrumbCtx.goBack}
                                    className={style.LatBtn}
                                >
                                    <IoIosArrowBack></IoIosArrowBack>
                                </div>

                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        Router.push("/");
                                    }}
                                >
                                    <h1>FIRST DATA</h1>
                                </div>

                                <div
                                    style={BreadCrumbCtx.ForwardBreadCrumb.length > 0 ? {} : { opacity: 0.1 }}
                                    onClick={BreadCrumbCtx.goForward}
                                    className={style.LatBtn}
                                >
                                    <IoIosArrowForward></IoIosArrowForward>
                                </div>
                            </div>
                            <div className={style.CentralMidSection}></div>
                            <div className={style.CentralBottomSection}>AC - solutions</div>
                        </div>
                    )}

                    {!status ||
                        status === "loading" ||
                        (status === "unauthenticated" && (
                            <>
                                <div className={style.CentralMenuContentFull}>
                                    <div className={style.CentralTopSection}>
                                        <div
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                Router.push("/");
                                            }}
                                        >
                                            <h1>FIRST DATA</h1>
                                        </div>
                                    </div>
                                    <div className={style.CentralMidSection}></div>
                                    <div className={style.CentralBottomSection}></div>
                                </div>
                            </>
                        ))}

                    {status && status === "authenticated" && (
                        <div>
                            <nav>
                                <ul>
                                    {MenuData &&
                                        MenuData.length > 0 &&
                                        MenuData.filter((item) => item.page.IsAgenzia).map((item, index) => (
                                            <MenuSection verticalOrder={index + 1} PrevLevel={0} baseSection={item}></MenuSection>
                                        ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ModernMenu;
