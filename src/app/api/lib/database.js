import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If a connection is already established, return the existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Otherwise, establish a new connection
  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect( `${MONGODB_URI}`).then((mongoose) => {
      console.log('MongoDB connected !!');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectDB };
