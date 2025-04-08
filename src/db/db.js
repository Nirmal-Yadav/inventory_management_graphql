import mongoose from "mongoose";

console.log("process.env.MONGO_URI0", process.env.MONGO_URI);

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );

    console.log(`\n mongo db connected`);
  } catch (error) {
    console.log("MONGO db connection error");
    process.exit(1);
  }
}

export default connectDB;
