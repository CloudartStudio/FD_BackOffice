import T_partner from "../../../../../models/sql_model/T_partner";
import T_utenti_login from "../../../../../models/sql_model/T_utenti_login";
import { hashPassword, generateRandomPassword } from "../../../../../helpers/auth";
import MailSender from "../../../../../helpers/mailSender";

const postReq = async (req, res) => {
    try {
        const {
            ragione_sociale,
            partita_iva,
            codice_sdi,
            telefono,
            cellulare,
            indirizzo_sede_fisica,
            indirizzo_sede_legale,
            settore_merceologico,
            pec,
            email,
            numero_dipendenti,
            is_b2b,
            is_b2c,
            nome,
        } = req.body;

        const newT_partner = new T_partner(
            null,
            ragione_sociale,
            partita_iva,
            codice_sdi,
            telefono,
            cellulare,
            indirizzo_sede_fisica,
            indirizzo_sede_legale,
            parseInt(settore_merceologico),
            nome,
            pec,
            email,
            parseInt(numero_dipendenti),
            Boolean(is_b2b),
            Boolean(is_b2c)     
        );

        const returnObj = await newT_partner.insertOne();
        const id = (await T_partner.fetchOneByField("email", email)).ID;
        const autoGeneratedPassword = generateRandomPassword("high", 16);
        const newT_utenti_login = new T_utenti_login(id, 3, await hashPassword(autoGeneratedPassword));
        const result = await newT_utenti_login.insertOne();

        const mailSender = new MailSender("lunghimicheledev@gmail.com", "Mi55TaLab4nn4n4");
        mailSender.sendMail(
            email,
            "Password for your new account",
            `<h1>Your password is: ${autoGeneratedPassword}</h1<h3>your account name is:${email}</h3><b>Change it as soon as possible</b>`
        );

        return res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).send({ message: "Error creating new T_partner", error: error });
    }
};

const getReq = async (req, res) => {
    try {
        const result = await T_partner.fetchAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_partner data", error: error });
    }
};

export default async (req, res) => {
    try {
        if (req.method === "POST") {
            await postReq(req, res);
        } else if (req.method === "GET") {
            await getReq(req, res);
        } else {
            res.status(405).send({ message: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
};
