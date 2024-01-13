import { connectDatabase, insertDocument } from "@/helpers/db-utils";
import type { MongoClient } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const registeredEmail = body.email;

    if (!registeredEmail || !registeredEmail.includes('@')){
        return NextResponse.json({ message: 'Invalid email address.' }, { status: 422 });
    }
    let client: MongoClient;

    // TRY CONNECTING TO THE DATABASE // MONGODB CODES
    try {
        client = await connectDatabase();
    } catch (err) { 
        return NextResponse.json({ message: 'Connecting to the database failed.' }, { status: 500 });
    }

    // TRY INSERTING THE DATA TO DB // MONGODB CODES
    try {
        await insertDocument(client, 'newsletter', { email: registeredEmail });
        client.close();
    } catch (err) {
        return NextResponse.json({ message: 'Email registration failed.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Sign Up Success!', email: registeredEmail }, { status: 201 });
}