class T_utenti_login extends SqlBase {
    constructor(ID_partner, ID_ruolo, password) {
        super("T_utenti_login");
        this.ID_partner = ID_partner;
        this.ID_ruolo = ID_ruolo;
        this.password = password;
    }
}
