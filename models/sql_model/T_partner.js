import SqlBase from "./base/sqlBase";

class T_partner extends SqlBase {
    constructor(
        id,
        ragione_sociale,
        partita_iva,
        codice_sdi,
        telefono,
        cellulare,
        indirizzo_sede_fisica,
        indirizzo_sede_legale,
        settore_merceologico,
        nome,
        pec,
        email,
        numero_dipendenti,
        is_b2b,
        is_b2c
    ) {
        super("T_partner");
        this.ID = id;
        this.ragione_sociale = ragione_sociale;
        this.partita_iva = partita_iva;
        this.codice_sdi = codice_sdi;
        this.telefono = telefono;
        this.cellulare = cellulare;
        this.indirizzo_sede_fisica = indirizzo_sede_fisica;
        this.indirizzo_sede_legale = indirizzo_sede_legale;
        this.settore_merceologico = settore_merceologico;
        this.nome = nome;
        this.pec = pec;
        this.email = email;
        this.numero_dipendenti = numero_dipendenti;
        this.is_b2b = is_b2b;
        this.is_b2c = is_b2c;
    }
}

export default T_partner;
