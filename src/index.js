import express from "express";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import authRouter from "./routes/auth";
const app = express();

app.use(express.json());

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/login/", authRouter);
app.listen(8080, () => {
  console.log("the app is running");
});

export default app;
