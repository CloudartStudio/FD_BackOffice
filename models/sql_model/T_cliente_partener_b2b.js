import SqlBase from "./base/sqlBase";

class T_cliente_partener_b2b extends SqlBase {
    constructor(
        id,
        ID_partner,
        ragione_sociale,
        partita_iva,
        codice_sdi,
        telefono,
        cellulare,
        indirizzo,
        nome,
        pec,
        email,
        indirizzo_sede_fisica,
        indirizzo_sede_legale
    ) {
        super("T_cliente_partener_b2b");
        this.ID = id;
        this.ID_partner = ID_partner;
        this.ragione_sociale = ragione_sociale;
        this.partita_iva = partita_iva;
        this.codice_sdi = codice_sdi;
        this.telefono = telefono;
        this.cellulare = cellulare;
        this.indirizzo = indirizzo;
        this.nome = nome;
        this.pec = pec;
        this.email = email;
        this.indirizzo_sede_fisica = indirizzo_sede_fisica;
        this.indirizzo_sede_legale = indirizzo_sede_legale;
    }

    static async fetchAll() {
        return super.Base_fetchAll("T_cliente_partener_b2b");
    }

    static async fetchOne(id) {
        return super.Base_fetchOne(id, "T_cliente_partener_b2b");
    }

    static async fetchOneByField(fieldName, fieldValue) {
        return super.Base_fetchOneByField(fieldName, fieldValue, "T_cliente_partener_b2b");
    }

    static async executeQuery() {
        return super.Base_executeQuery("T_cliente_partener_b2b");
    }

    static async Base_executeStoredProcedure() {
        return super.Base_executeStoredProcedure("T_cliente_partener_b2b");
    }

    static async Base_executeFunction() {
        return super.Base_executeFunction("T_cliente_partener_b2b");
    }
}

export default T_cliente_partener_b2b;
