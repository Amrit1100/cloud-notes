import {MongoClient} from "mongodb"

let client;
let clientPromise;

if (!(global._mongoClientPromise)){
    client = new MongoClient("mongodb://localhost:27017/")
    global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export default clientPromise