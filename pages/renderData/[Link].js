import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import Head from "next/head";
import Datacharts from "../../components/data_component/datacharts";
import FieldVisualizer from "../../components/data_component/fieldvisualizer";

const RenderData = () => {
    const [PageConfig, setPageConfig] = useState(null); // Spostato prima di useEffect
    const router = useRouter();
    const { Link } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (Link) {
                console.log(Link);
                //CHIAMATA AL API PER LE CONFIGURAZIONI PASSANDO IL LINK
                const PageConfigResponse = await fetch("http://localhost:3000/api/dynPageConfig/" + Link);

                const cfg = await PageConfigResponse.json();

                setPageConfig(cfg);
                console.log("PageConfig", cfg);
            }
        };
        fetchData();
    }, [Link]);

    return (
        PageConfig &&
        PageConfig.Sections && (
            <>
                <Head>
                    <title>{PageConfig.Nome}</title>
                </Head>
                <div>
                    {PageConfig.Sections.map((s) => {
                        console.log("s", s.Tipo);
                        console.log("SECTION", s);
                        switch (s.Tipo) {
                            case "0":
                                return <FieldVisualizer ConfigData={s.Configs}></FieldVisualizer>;
                            case "1":
                                return <Datacharts ConfigData={s.Configs}></Datacharts>;
                        }
                    })}
                </div>
            </>
        )
    );
};

export default RenderData;
