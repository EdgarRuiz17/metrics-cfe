import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as path from "path";
import { connectToDB } from "./database/database";
import metrics from "./routes/metrics.routes";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
   origin: allowedOrigins,
};

const app = express();

connectToDB();

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(options));

const port = 5000;

app.listen(port, function () {
   console.log(`listening on port ${port}!`);
});

app.use("/metrics", metrics);
