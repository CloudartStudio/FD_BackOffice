import { MongoClient } from "mongodb";

const url = "mongodb+srv://michelelunghi98:e5J8iMmLP4otUWX9@micheledb.mmo9gkq.mongodb.net/?retryWrites=true&w=majority";

let db;

const mongoDBConnect = async () => {
    try {
        const client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        db = client.db("first_data_settings");
        console.log(db);
    } catch (err) {
        console.error(err);
        throw new Error("Could not connect to MongoDB");
    }
};

const getDB = async () => {
    if (db) {
        console.log("Database already initialized");
        return db;
    } else {
        console.log("Initializing database connection");
        await mongoDBConnect();
        if (db) {
            console.log("MONGO DB:");
            console.log(db);
            return db;
        } else {
            throw new Error("Database not initialized");
        }
    }
};

export { getDB };
