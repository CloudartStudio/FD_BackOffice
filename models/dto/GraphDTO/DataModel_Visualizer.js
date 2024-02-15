export default function baseModel() {
    return [
        {
            nome_campo: "IconID",
            tipo_campo: "icon",
            valore_campo: null,
            label: "Icona",
        },
        {
            nome_campo: "Label1",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "Titolo",
            funzioni_campo: null,
        },
        {
            nome_campo: "Info",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "Descrizione",
            funzioni_campo: null,
        },
        {
            nome_campo: "ValueInfo",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "Valuta / Unita di misura",
            funzioni_campo: null,
        },
        {
            nome_campo: "Value",
            tipo_campo: "any",
            valore_campo: null,
            querable: true,
            label: "Valore",
            funzioni_campo: null,
        },
        {
            nome_campo: "backgroundColor",
            tipo_campo: "color",
            valore_campo: null,
            label: "col. sfondo",
        },
        {
            nome_campo: "borderColor",
            tipo_campo: "color",
            valore_campo: null,
            label: "col. testi",
        },
    ];
}
