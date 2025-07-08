import logmaker from "../../Logging Middleware/logMaker.js";

export const createUrlShortner = (req, res) => {
  try {
    //create url shortner service
    console.log(req.body);

    const {url, validity, shortcode} = req.body;

    //if no url provided by the user
    if (!url) {
      logmaker("backend", "error", "handler", "please provide proper URL");
      return res.send("please provide URL");
    }

    //if the user has provided its own secret code and expiry time
    if (url && shortcode && expiry) {
      logmaker(
        "backend",
        "info",
        "handler",
        "short url created with an expiry time"
      );
      return res.status(201).json({shortlink: `/${shortcode}`, expiry: expiry});
    }

    //if the user has provided its own secret code and not provided expiry time
    if (url && shortcode) {
      logmaker("backend", "info", "handler", "short url created");

      return res.status(201).json({shortlink: `/${shortcode}`});
    }

    //if the user has not provided its own secret code
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (const i = 0; i < 7; i++) {}
  } catch (err) {
    console.log(err);
    logmaker("backend", "fatal", "handler", "internal error");
    return res.send("error", err.messsage);
  }
};
