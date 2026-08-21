// config/db.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // options optional
    });
    console.log("✅ MongoDB Connected Successfully");
    return;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // Only fall back to an in-memory server for non-production environments
    if (process.env.NODE_ENV === "production") {
      // In production we should fail fast
      process.exit(1);
    }

    console.log("ℹ️ Falling back to in-memory MongoDB for local development.");
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri, {});
      console.log("✅ Connected to in-memory MongoDB");
      // keep mongod reference alive so the server doesn't get garbage-collected
      // eslint-disable-next-line no-unused-vars
      const _mongod = mongod;
    } catch (memErr) {
      console.error("❌ In-memory MongoDB failed:", memErr.message || memErr);
      process.exit(1);
    }
  }
};

export default connectDB;
