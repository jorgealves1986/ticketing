import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

/* declare global {
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>;
    }
  }
} */

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  jest.clearAllMocks(); //to reset all mocks
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
