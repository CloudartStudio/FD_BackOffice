import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";

import T_partener from "../../../models/sql_model/T_partner";
import T_cliente_partener_b2c from "../../../models/sql_model/T_cliente_partener_b2c";
import T_cliente_partener_b2b from "../../../models/sql_model/T_cliente_partener_b2b";
import T_admin from "../../../models/sql_model/T_admin";
import T_utenti_login from "../../../models/sql_model/T_utenti_login";

const verifyCredentials = async (id_acc_data, supposedPassword) => {
    const utenteLogin = await T_utenti_login.fetchOneByField("ID_partner", id_acc_data);
    if (!utenteLogin) {
        return false;
    }

    const isValid = await verifyPassword(supposedPassword, utenteLogin.password);

    if (isValid) {
        return {
            utenteLogin,
        };
    } else {
        return false;
    }
};

const formatJWT = (result, email) => {
    if (result) {
        const obj = {
            ID_ruolo: result.utenteLogin.ID_ruolo,
            email: email,
            ID_partener: result.utenteLogin.ID_partner,
            ID: result.utenteLogin.ID,
        };
        return {
            email: obj,
        };
    } else throw new Error("Invalid password");
};

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { password, email } = credentials;
                let result;

                const admin = await T_admin.fetchOneByField("email", email);
                if (admin) {
                    result = await verifyCredentials(admin.ID, password);
                } else {
                    const partener = await T_partener.fetchOneByField("email", email);
                    if (partener) {
                        result = await verifyCredentials(partener.ID, password);
                    } else {
                        const cliente_partener_b2c = await T_cliente_partener_b2c.fetchOneByField("email", email);
                        if (cliente_partener_b2c) {
                            result = await verifyCredentials(cliente_partener_b2c.ID, password);
                        } else {
                            const cliente_partener_b2b = await T_cliente_partener_b2b.fetchOneByField("email", email);
                            if (cliente_partener_b2b) {
                                result = await verifyCredentials(cliente_partener_b2b.ID, password);
                            } else {
                                throw new Error("Invalid email");
                            }
                        }
                    }
                }

                // Any object returned will be saved in `user` property of the JWT
                // If you return null then an error will be displayed advising the user to check their details.
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                return formatJWT(result, email);
            },
        }),
    ],
    session: {
        jwt: true,
        //maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 10 * 60, // 30 secondi
    },
    jwt: {
        maxAge: 30,
        // async encode() {},
        // async decode() {},
    },
};

export default NextAuth(authOptions);
