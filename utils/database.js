import mongoose from 'mongoose';

let isConnected = false; //track connection status;

export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Using existing connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
