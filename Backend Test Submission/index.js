import express, {urlencoded} from "express";
import dotenv from "dotenv";
import logmaker from "../Logging Middleware/logMaker.js";
import {createUrlShortner, getUrlData} from "./controllers/urlservice.js";
import {connectDb} from "./config/connectdb.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDb();

//routes
app.get("/", (req, res) => {
  logmaker(
    "backend",
    "info",
    "route",
    "Hello response from server on home page route- /"
  );
  return res.send("hello from server");
});
app.post("/shorturls", createUrlShortner);
app.get("/shorturls/:id", getUrlData);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
