const SqlBase = require("./sql_base");

class T_ruoli extends SqlBase {
    constructor(ID, ruolo, descrizione) {
        super("T_ruoli");
        this.ID = ID;
        this.ruolo = ruolo;
        this.descrizione = descrizione;
    }
}

module.exports = T_ruoli;
