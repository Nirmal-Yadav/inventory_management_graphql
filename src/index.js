// index.js
import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log("server running on port ", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("mongo db connection failed");
  });
