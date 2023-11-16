import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

if (!process.env.MONGODB_URI)
    throw new Error("Missing environment variable 'MONGODB_URI'.");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let clientPromise;
if (process.env.NODE_ENV === 'development') {
    let globalMongo = global;
    if (!globalMongo._mongoConnect) {
        globalMongo._mongoConnect = client.connect();
    }
    clientPromise = globalMongo._mongoConnect;
}
else {
    clientPromise = client.connect();
}
export default clientPromise;
