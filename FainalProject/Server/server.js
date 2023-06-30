import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/productRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import UserRoute from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", UserRoute);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Error Handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 1000;
app.listen(port, console.log(`server run on port ${port}`));
