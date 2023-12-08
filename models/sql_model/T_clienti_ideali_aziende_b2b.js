import SqlBase from "./base/sqlBase";

class T_clienti_ideali_aziende_b2b extends SqlBase {
    constructor(id, ID_azienda_b2b, settore, descrizione) {
        super("T_clienti_ideali_aziende_b2b");
        this.ID = id;
        this.ID_azienda_b2b = ID_azienda_b2b;
        this.settore = settore;
        this.descrizione = descrizione;
    }
}

export default T_clienti_ideali_aziende_b2b;
