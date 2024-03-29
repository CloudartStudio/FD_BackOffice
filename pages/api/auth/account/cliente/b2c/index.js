import T_cliente_partener_b2c from "../../../../../../models/sql_model/T_cliente_partener_b2c";
import { hashPassword, generateRandomPassword } from "../../../../../../helpers/auth";
import MailSender from "../../../../../../helpers/mailSender";
import T_utenti_login from "../../../../../../models/sql_model/T_utenti_login";

const postReq = async (req, res) => {
    try {
        const { 
            ID_partner, 
            nome, 
            cognome, 
            data_nascita, 
            telefono, 
            is_maschio, 
            email, 
            indirizzo, 
            custom_data 
        } = req.body;

        const mewTcliente_p_b2c = new T_cliente_partener_b2c(
            null,
            ID_partner,
            nome,
            cognome,
            data_nascita,
            telefono,
            Boolean(is_maschio),
            email,
            indirizzo,
            custom_data
        );

        const returnObj = await mewTcliente_p_b2c.insertOne();
        const id = (await T_cliente_partener_b2c.fetchOneByField("email", email)).ID;
        const autoGeneratedPassword = generateRandomPassword("high", 16);
        console.log("SALVA LA PASSWORD MICHELE!!!!!!!!", autoGeneratedPassword);
        const newT_utenti_login = new T_utenti_login(id, 4, await hashPassword(autoGeneratedPassword));
        const result = await newT_utenti_login.insertOne();

        const mailSender = new MailSender("lunghimicheledev@gmail.com", "Mi55TaLab4nn4n4");
        mailSender.sendMail(
            email,
            "Password for your new account",
            `<h1>Your password is: ${autoGeneratedPassword}</h1<h3>your account name is:${email}</h3><b>Change it as soon as possible</b>`
        );

        return res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).send({ message: "Error creating new T_cliente_partener_b2c", error: error });
    }
};

const getReq = async (req, res) => {
    try {
        const result = await T_cliente_partener_b2c.fetchAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching T_cliente_partener_b2c data", error: error });
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
