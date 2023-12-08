import SqlBase from "./base/sqlBase";

class T_vendita_giornaliera extends SqlBase {
    constructor(id, ID_partner, data, totale_incasso, totale_numero_vendite, note) {
        super("T_vendita_giornaliera");
        this.ID = id;
        this.ID_partner = ID_partner;
        this.data = data;
        this.totale_incasso = totale_incasso;
        this.totale_numero_vendite = totale_numero_vendite;
        this.note = note;
    }
}

export default T_vendita_giornaliera;
