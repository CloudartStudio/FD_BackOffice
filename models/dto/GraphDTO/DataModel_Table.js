export default function baseModel() {
    return [
        {
            nome_campo: "nomeTabella",
            tipo_campo: "string",
            valore_campo: null,
            querable: false,
            label: "Nome tabella",
        },
        {
            nome_campo: "Columns",
            tipo_campo: "any",
            valore_campo: null,
            querable: true,
            label: "Colonne",
            funzioni_campo: null,
            isGroupingField: false,
            having: false,
            Error: null,
        },
    ];
}
