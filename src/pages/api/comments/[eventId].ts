// import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-utils";

const handler = async (req, res) => {
    const eventId = req.query.eventId;
    let client;

    // CONNECT TO MONGODB
    try {
        client = await connectDatabase();
    } 
    catch (err) {
        res.status(500).json({ message: 'Connecting to the DB failed.' });
        return;
    }
    
    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        // VALIDATOR
        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({ message: 'Invalid input.' });
            client.close();
            return;
        }
        const newComment: any = { email, name, text, eventId };

        // TRY INSERTING A NEW COMMENT
        try {
            const result = await insertDocument(client, 'comments', newComment);
            // const result = await db.collection('comments').insertOne(newComment);
            newComment._id = result.insertedId;

            res.status(201).json({ message: 'Add comment Success!', comment: newComment });
        }
        catch (err) {
            res.status(500).json({ message: 'Inserting comment failed.' });
        }
        
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments( client, 'comments', { _id: -1 }, { eventId: eventId });
            res.status(200).json({ comments: documents });
        }
        catch (err) {
            res.status(500).json({ message: 'Getting comments failed.'});
        }
    }

    client.close();
}

export default handler;