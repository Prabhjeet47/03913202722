import logmaker from "../../Logging Middleware/logMaker.js";
import urlModel from "../models/url.js";

export const createUrlShortner = async (req, res) => {
  try {
    //create url shortner service
    console.log(req.body);

    const {url, validity = 30, shortcode} = req.body;

    //if no url provided by the user
    if (!url) {
      await logmaker(
        "backend",
        "error",
        "handler",
        "please provide proper URL"
      );
      return res.status(400).json({msg: "please provide URL"});
    }

    //if the user has provided its own secret code and expiry time
    if (url && shortcode && validity) {
      await logmaker(
        "backend",
        "info",
        "handler",
        "short url created with an expiry time"
      );

      return res
        .status(201)
        .json({shortlink: `http://localhost`, expiry: `something`});
    }

    //if the user has provided its own secret code and not provided expiry time
    if (url && shortcode) {
      await logmaker("backend", "info", "handler", "short url created");
      return res
        .status(201)
        .json({shortlink: `/${shortcode}`, expiry: `something`});
    }

    //if the user has not provided its own secret code
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (const i = 0; i < 7; i++) {}
  } catch (err) {
    console.log(err);
    logmaker("backend", "fatal", "handler", "internal error");
    return res.send("error", err.message);
  }
};
