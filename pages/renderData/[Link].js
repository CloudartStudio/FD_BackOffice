import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Head from "next/head";
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
                const PageConfigResponse = await fetch(
                    "http://localhost:3000/api/dynPageConfig/" + Link
                );

                setPageConfig(await PageConfigResponse.json());
                console.log(PageConfig);
            }
        };
        fetchData();
    }, [Link]);

    return (
        PageConfig &&
        PageConfig.Sections && (
            <>
                <Head>
                    <title>MIKE</title>
                </Head>
                <div>
                    {PageConfig.Sections.map((s) => {
                        switch (s.TypeOfElement) {
                            case 0:
                                return (
                                    <FieldVisualizer
                                        ConfigData={s.ConfigData}
                                        Link={Link}
                                        SectionID={s.ID}
                                    ></FieldVisualizer>
                                );
                        }
                    })}
                </div>
            </>
        )
    );
};

export default RenderData;
