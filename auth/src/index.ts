import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  try {
    console.log('Starting up');
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');

    // Essentially, just put the express app startup in the 'try' block.
    // Now, if mongoose fails to connect express will never start up, and the node process will exit.
    // That will cause the container to shut down.  The pod will see this and try to restart the container.
    // This process will repeat until mongoose can successfully connect to mongodb.
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  } catch (err) {
    console.error(err);
  }
};

start();
