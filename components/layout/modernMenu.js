import style from "../../styles/modernlayout.module.css";
import MenuSection from "../../components/menu/MenuSection";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import BreadCrumbContext from "../../context/breadcrumbContext";

const options = {
    fpsLimit: 120,
    particles: {
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 6,
        },
        color: {
            value: "#2c2f41",
        },
        shape: {
            polygon: {
                nb_sides: 8,
            },
            image: {
                width: 100,
                height: 100,
            },
            type: "polygon",
        },
        size: {
            anim: {
                enable: true,
                speed: 8,
                size_min: 40,
                sync: false,
            },
            value: 80,
            random: false,
        },
        opacity: {
            value: 0.1,
            random: true,
        },
        links: {
            enable: false,
        },
        move: {
            enable: true,
            direction: "none",
            random: false,
            straight: false,
            speed: 0.3,
            outModes: {
                default: "out",
            },
        },
    },
    interactivity: {
        events: {
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    background: {
        color: {
            value: "transparent",
        },
    },

    detectRetina: true,
};

const ModernMenu = ({ indexOfPage, MenuData, IsFullScreen }) => {
    const particlesInit = async (main) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    const Router = useRouter();
    const BreadCrumbCtx = useContext(BreadCrumbContext);

    useEffect(() => {
        Router.events.on("routeChangeComplete", (url, { shallow }) => {
            BreadCrumbCtx.addToBreadCrumb(url);
        });
    }, []);

    // ICONA IN ALTO A DX PER VISUALIZZARE L'APERTURA FULL SCREEN, ICONA TIPO YOUTUBE VEDI COME SONO FATTE LE ALTRE ICONE -> Icon Selector
    // EVENTO IN MODERN LAYOUT DI TIPO STATO ([isFullScreen,SetFullScreen] = usestate(false))
    // SEMPRE IN MODERN LAYOUT FAI UN HANDLER IN CUI GESTISCI TUTTO (il gestisici tutto è quello che devi fare tu)
    // CREI UN ICONA PER CHIUDERE IL FULL SCREEN DA METTERE NEL BODY DEL LAYOUT
    // ATTACCARE GLI EVENTI PASSANDOLI COME ATTRIBUTI E GESTIRE IL COMPORTAMENTO DELLA PAGINA
    // FAI SI CHE VENGA MODIFICTA LA FORMA DELLA BOX
    // ASSICURATI CHE IL CONTENUTO AL INTERNO DELLA BODY SI RIDIMENSIONI OGNI VOLTA CHE CLICCHI -> Puoi usare chat gpt e altro

    return (
        <div id="particles-js" className={style.menubase}>
            <Particles init={particlesInit} options={options}></Particles>
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
