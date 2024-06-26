import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const option = {};

if (!URI) throw new Error('Failed to connect to MongoDB!');

let client = new MongoClient(URI, option);
let clientPromise;

if (process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
