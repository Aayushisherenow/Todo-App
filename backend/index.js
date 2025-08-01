import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js';


dotenv.config();




const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(`MongoDB connected !!!! DB HOST:${conn.connection.host}`);
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
};

connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));