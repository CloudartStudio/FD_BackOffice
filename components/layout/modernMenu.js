import style from "../../styles/modernlayout.module.css";
import MenuSection from "../../components/menu/MenuSection";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import BreadCrumbContext from "../../context/breadcrumbContext";

const ModernMenu = ({ indexOfPage, MenuData, IsFullScreen }) => {
    const Router = useRouter();
    const BreadCrumbCtx = useContext(BreadCrumbContext);

    useEffect(() => {
        Router.events.on("routeChangeComplete", (url, { shallow }) => {
            BreadCrumbCtx.addToBreadCrumb(url);
        });
    }, []);

    return (
        <div id="particles-js" className={style.menubase}>
            {!IsFullScreen && (
                <>
                    {indexOfPage == 0 && (
                        <nav>
                            <ul>
                                {MenuData.filter((item) => item.IsLeft).map((item, index) => (
                                    <MenuSection verticalOrder={index + 1} PrevLevel={0} baseSection={item}></MenuSection>
                                ))}
                            </ul>
                        </nav>
                    )}
                    {indexOfPage == 0 && (
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
                                    <h1>IKEA</h1> <i>your</i> <h3>FIRST DATA</h3>
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

                    {indexOfPage == 1 && (
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
                    )}

                    {indexOfPage == 0 && (
                        <div>
                            <nav>
                                <ul>
                                    {MenuData.filter((item) => !item.IsLeft).map((item, index) => (
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
