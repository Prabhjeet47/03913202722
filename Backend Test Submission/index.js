import express, {urlencoded} from "express";
import dotenv from "dotenv";
import logmaker from "../Logging Middleware/logMaker.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
