import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async function LogMaker(stack, level, p, message) {
  //make logs here by sending post request to the below URL
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: p,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
}
