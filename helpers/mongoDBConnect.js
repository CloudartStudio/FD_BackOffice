import { MongoClient } from "mongodb";

const url = "mongodb+srv://michelelunghi98:e5J8iMmLP4otUWX9@micheledb.mmo9gkq.mongodb.net/?retryWrites=true&w=majority";

let client;
let db;

const mongoDBDisconnect = async () => {
    try {
        if (client) {
            await client.close();
            console.log("Disconnected from MongoDB");
        }
    } catch (err) {
        console.error("Error closing MongoDB connection:", err);
    }
};

const getDB = async () => {
    if (db) {
        console.log("Database already initialized");
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        db = client.db("first_data_settings");
        return db;
    } else {
        console.log("Initializing database connection");
        client = await MongoClient.connect(url);
        console.log("Connected to MongoDB");
        db = client.db("first_data_settings");
        if (db) {
            console.log("MONGO DB:");
            console.log(db);
            return db;
        } else {
            throw new Error("Database not initialized");
        }
    }
};

export { getDB, mongoDBDisconnect };
