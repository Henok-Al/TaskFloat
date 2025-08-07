import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/connectDB.js";
import routes from "./routes/index.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//app.use(morgan("dev"));
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
})