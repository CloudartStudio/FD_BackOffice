export default function baseModel() {
    return [
        {
            nome_campo: "labelDataSet",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "etichetta dataset",
        },
        {
            nome_campo: "Labels",
            tipo_campo: "string",
            valore_campo: null,
            querable: true,
            label: "etichetta legenda",
            funzioni_campo: null,
        },
        {
            nome_campo: "GraphData",
            tipo_campo: "any",
            valore_campo: null,
            querable: true,
            label: "Dato visualizzato",
            funzioni_campo: null,
        },
        {
            nome_campo: "backgroundColor",
            tipo_campo: "color",
            valore_campo: null,
            querable: false,
            label: "colore dati",
        },
        {
            nome_campo: "borderColor",
            tipo_campo: "color",
            valore_campo: null,
            querable: false,
            label: "colore bordo dati",
        },
    ];
}
