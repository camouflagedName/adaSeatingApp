import clientPromise from "../mongoDB.js";
import readline from "readline";
//import { seatList } from "./seatList";

const databaseName = 'ADASeatingDB';
const collectionName = process.argv[2]; 4

const runSeedData = async () => {
    try {
        const dataModule =
            collectionName === 'seats' ? await import("./seatList.js") : null

        const client = await clientPromise;
        const db = client.db(databaseName);

        // Get a reference to the collection
        const collection = db.collection(collectionName);

        await collection.deleteMany({});

        if (dataModule) {
            await collection.insertMany(dataModule.data);
            console.log(`${dataModule.data.length} items inserted into collection ${collectionName}`);
        } else throw new Error(`Collection Name ${collectionName} does not exist.`)

        // Close the MongoDB connection
        await client.close();
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

if (collectionName) runSeedData();
else {
    console.log("Collection name not included. Please include a collection name to proceed.");
    process.exit(1);
}

/* 
        const existingDataCount = await collection.countDocuments();
        if (existingDataCount > 0) {

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })

            rl.question(`There are ${existingDataCount} existing documents in the collection. Okay to delete? (yes/no): `, async (answer) => {


                if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                    // Delete all entries in the collection before seeding
                    await collection.deleteMany({});
                    console.log(`Existing data deleted from collection ${collectionName}`);
                } else {
                    console.log(`No data deleted from collection ${collectionName}`);
                }

                if (dataModule) {
                    await collection.insertMany(dataModule.data);
                    console.log(`${dataModule.data.length} items inserted into collection ${collectionName}`);
                } else {
                    console.log(`Collection Name ${collectionName} does not exist.`);
                }

                rl.close();
            })


        } else {

            if (dataModule) {
                await collection.insertMany(dataModule.data);
                console.log(`${dataModule.data.length} items inserted into collection ${collectionName}`);
            } else throw new Error(`Collection Name ${collectionName} does not exist.`)
        } */