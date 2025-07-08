import axios from "axios";

export default async function LogMaker(stack, level, p, message) {
  //make logs here by sending post request to the below URL
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack: stack,
      level: level,
      package: p,
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
}
