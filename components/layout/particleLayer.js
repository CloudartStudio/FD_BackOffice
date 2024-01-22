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

const ParticleLayer = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <div id="particles-js" className={style.particleLayer}>
            <Particles init={particlesInit} options={options}></Particles>
        </div>
    );
};

export default ParticleLayer;
