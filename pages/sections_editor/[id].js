import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import Head from "next/head";
import NewFieldVisualizerModal from "../../components/modal/NewFieldVisualizerModal";

const SectionsEditor = () => {
    const [sectionsConfig, setSectionsConfig] = useState(null);
    const [typeOfSection, setTypeOfSection] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [nomeSezione, setNomeSezione] = useState("");
    const [tipo, setTipo] = useState("");
    const [verticalOrder, setVerticalOrder] = useState("");
    const [minRole, setMinRole] = useState("");

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(id);
                const sectionsConfigResponse = await fetch(
                    "http://localhost:3000/api/dynamicSections/" + id
                );

                const data = await sectionsConfigResponse.json();

                setSectionsConfig(data);
                setNomeSezione(data.NomeSezione);
                setTipo(data.Tipo);
                setVerticalOrder(data.VerticalOrder);
                setMinRole(data.MinRole);

                console.log("Sections Config", sectionsConfig);
                console.log("data", data);
                setTypeOfSection(data.Tipo);
            }
        };
        fetchData();
    }, [id]);

    return (
        sectionsConfig && (
            <>
                <Head>
                    <title>Section editor</title>
                </Head>
                <NewFieldVisualizerModal
                    isOpen={openModal}
                    onActionCloseModal={() => {
                        setOpenModal(false);
                    }}
                ></NewFieldVisualizerModal>
                <div>
                    <h3>Section info</h3>
                    <input
                        value={nomeSezione}
                        onChange={(e) => setNomeSezione(e.target.value)}
                        placeholder="Nome sezione"
                    />
                    <input
                        value={verticalOrder}
                        onChange={(e) => setVerticalOrder(e.target.value)}
                        placeholder="Vertical order"
                    />
                    <input
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        placeholder="Tipo"
                    />
                    <input
                        value={minRole}
                        onChange={(e) => setMinRole(e.target.value)}
                        placeholder="Min role"
                    />
                </div>
                <div>
                    <h3>Configurazioni</h3>
                    <div>
                        <div>
                            <hr></hr>
                            {typeOfSection && (
                                <button
                                    onClick={() => {
                                        if (typeOfSection == 0) {
                                            setOpenModal(true);
                                        } else if (typeOfSection == 1) {
                                        } else if (typeOfSection == 2) {
                                        } else if (typeOfSection == 3) {
                                        }
                                    }}
                                >
                                    Add config
                                </button>
                            )}
                            <hr></hr>
                        </div>
                    </div>
                    <div>
                        {sectionsConfig &&
                            sectionsConfig.RelatedConfigData.map((c) => {
                                return <p>CIAO</p>;
                            })}
                    </div>
                </div>
            </>
        )
    );
};

export default SectionsEditor;
