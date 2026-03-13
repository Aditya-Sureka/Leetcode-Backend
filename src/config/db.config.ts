// Database Configuration ->

import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

export const connectDB = async () => {
  try {
    const dbUrl = serverConfig.DB_URL;

    await mongoose.connect(dbUrl);

    logger.info("Connected to Mongodb successfully");

    mongoose.connection.on("error", (error) => {
      logger.error("Mongodb Conenction error", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDb Disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB Connection closed");
      process.exit(0);
    });
    
  } catch (error) {
    logger.error("failed to connect to mongodb", error);
    process.exit(1); // exit with failure
  }
};
