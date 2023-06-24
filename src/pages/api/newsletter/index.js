// import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../../helpers/db-utils";

const handler = async (req, res) => {
    if(req.method === 'POST') {
        const registeredEmail = req.body.email;

        if (!registeredEmail || !registeredEmail.includes('@')){
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }
        let client;

        // TRY CONNECTING TO THE DATABASE // MONGODB CODES
        try {
            client = await connectDatabase();
        } 
        catch (err) { 
            res.status(500).json({ message: 'Connecting to the database failed.' });
            return;
        }

        // TRY INSERTING THE DATA TO DB // MONGODB CODES
        try {
            await insertDocument(client, 'newsletter', { email: registeredEmail });
            client.close();
        } 
        catch (err) {
            res.status(500).json({ message: 'Email registration failed.' });
            return;
        }

        res.status(201).json({ message: 'Sign Up Success!', email: registeredEmail });
    }
}

export default handler;