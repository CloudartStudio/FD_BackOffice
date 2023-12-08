import SqlBase from "./base/sqlBase";

class T_clienti_azienda_b2b extends SqlBase {
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
        super("T_clienti_azienda_b2b");
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
}

export default T_clienti_azienda_b2b;
