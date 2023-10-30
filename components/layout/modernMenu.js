import style from "../../styles/modernlayout.module.css";
import MenuSection from "../../components/menu/MenuSection";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const options = {
    background: {
        color: {
            value: "transparent",
        },
    },
    fpsLimit: 120,
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
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 1000,
            },
            value: 50,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
};

const ModernMenu = ({ MenuData }) => {
    const particlesInit = async (main) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };

    return (
        <div id="particles-js" className={style.menubase}>
            <Particles init={particlesInit} options={options}></Particles>
            <nav>
                <ul>
                    {MenuData.filter((item) => item.IsLeft).map(
                        (item, index) => (
                            <MenuSection
                                verticalOrder={index + 1}
                                PrevLevel={0}
                                baseSection={item}
                            ></MenuSection>
                        )
                    )}
                </ul>
            </nav>
            <div className={style.CentralMenuContent}>
                <div className={style.CentralTopSection}>
                    <div>
                        <h1>IKEA</h1> <i>your</i> <h3>FIRST DATA</h3>
                    </div>
                </div>
                <div className={style.CentralMidSection}></div>
                <div className={style.CentralBottomSection}>AC - solutions</div>
            </div>
            <div>
                <nav>
                    <ul>
                        {MenuData.filter((item) => !item.IsLeft).map(
                            (item, index) => (
                                <MenuSection
                                    verticalOrder={index + 1}
                                    PrevLevel={0}
                                    baseSection={item}
                                ></MenuSection>
                            )
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ModernMenu;
