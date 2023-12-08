import ConfigBase from "../../models/nosql_model/base/ConfigBase";
import hashPassword from "../../helpers/auth";

//TO DELETE
class LoginUser extends ConfigBase {
    constructor(Email, Password) {
        super("LoginUser");
        this.Email = Email;
        hashPassword(Password).then((hashedPassword) => {
            this.Password = hashedPassword;
        });
    }

    static async FetchAll() {
        return super.BaseFetchAll();
    }

    static async GetOne(id) {
        return super.BaseGetOne(id);
    }
}

export default LoginUser;
