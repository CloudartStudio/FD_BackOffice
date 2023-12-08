import SqlBase from "./base/sqlBase";

class T_vendita_singola extends SqlBase {
    constructor(id, ID_partner, ID_cliente, data_vendita, prezzo, note, is_b2b) {
        super("T_vendita_singola");
        this.ID = id;
        this.ID_partner = ID_partner;
        this.ID_cliente = ID_cliente;
        this.data_vendita = data_vendita;
        this.prezzo = prezzo;
        this.note = note;
        this.is_b2b = is_b2b;
    }
}

export default T_vendita_singola;
