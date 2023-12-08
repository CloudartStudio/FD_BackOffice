import SqlBase from "./base/sqlBase";

class T_settore_merceologico extends SqlBase {
    constructor(id, nome, descrizione) {
        super("T_settore_merceologico");
        this.ID = id;
        this.nome = nome;
        this.descrizione = descrizione;
    }
}

module.exports = T_settore_merceologico;
