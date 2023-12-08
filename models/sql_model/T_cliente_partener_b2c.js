import SqlBase from "./base/sqlBase";

class T_cliente_partener_b2c extends SqlBase {
    constructor(id, ID_partner, nome, cognome, data_nascita, telefono, is_maschio, mail, indirizzo, custom_data) {
        super("T_cliente_partener_b2c");
        this.ID = id;
        this.ID_partner = ID_partner;
        this.nome = nome;
        this.cognome = cognome;
        this.data_nascita = data_nascita;
        this.telefono = telefono;
        this.is_maschio = is_maschio;
        this.mail = mail;
        this.indirizzo = indirizzo;
        this.custom_data = custom_data;
    }
}

export default T_cliente_partener_b2c;
