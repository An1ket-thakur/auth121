import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { sequelize } from "./config/sequelize";

sequelize
  .authenticate()
  .then(() => {
    app.listen(3000, (err) => {
      if (err) {
        console.error("Server Start Error", err);
        process.exit(1);
      } else {
        console.log("Server started successfully");
      }
    });
  })
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1);
  });
