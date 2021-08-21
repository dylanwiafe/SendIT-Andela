import express from "express";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();

const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb database connected successfully");
});

// connection.on("error", (err) => {
//   console.log("connection error");
// });

app.use(express.json());

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/auth/", authRouter);
app.listen(8080, () => {
  console.log("the app is running");
});

export default app;
