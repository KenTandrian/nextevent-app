import { Document, Filter, MongoClient, OptionalId, Sort } from "mongodb";

export const connectDatabase = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_EVENTS_URI);
    return client;
}

export const insertDocument = async (
    client: MongoClient, 
    collection: string, 
    document: OptionalId<Document>,
) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    return result;
}

export const getAllDocuments = async (
    client: MongoClient, 
    collection: string, 
    sort: Sort, 
    filter: Filter<Document> = {},
) => {
    const db = client.db();
    const doc = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();
    
    client.close();

    return doc;
}