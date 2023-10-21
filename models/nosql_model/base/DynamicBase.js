import { ObjectId } from "mongodb";
import { getDB } from "../../../helpers/mongoDBConnect";

class DynamicBase {
    constructor(collectionName) {
        if (new.target === DynamicBase) {
            throw new TypeError(
                "Non puoi istanziare direttamente questa classe"
            );
        }

        this.collectionName = collectionName;
    }

    async save() {
        try {
            const db = await getDB();
            const result = await db
                .collection(this.collectionName)
                .insertOne(this);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async Update(stringID) {
        try {
            const id = new ObjectId(stringID);
            const db = await getDB();
            const result = await db.collection(collectionName).updateOne(
                { _id: id }, // filtro
                { $set: this } // aggiornamenti
            );
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async _BaseFetchAll(collectionName) {
        try {
            const db = await getDB();
            const result = await db.collection(collectionName).find().toArray();
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async _BaseGetOne(stringID, collectionName) {
        try {
            const id = new ObjectId(stringID);
            const db = await getDB();
            const result = await db
                .collection(collectionName)
                .findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default DynamicBase;
