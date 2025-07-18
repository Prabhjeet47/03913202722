import logmaker from "../../Logging Middleware/logMaker.js";
import urlModel from "../models/url.js";
import dotenv from "dotenv";

dotenv.config();

export const createUrlShortner = async (req, res) => {
  try {
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

    //if the user has provided its own short code
    if (shortcode) {
      const exists = await urlModel.findOne({shortcode});
      if (exists) {
        await logmaker(
          "backend",
          "error",
          "handler",
          "Shortcode already exists"
        );
        return res.status(409).json({msg: "Shortcode already in use"});
      }
      await urlModel.create({
        shortcode: shortcode,
        defaulturl: url,
        validity: validity,
      });

      await logmaker(
        "backend",
        "info",
        "handler",
        `Custom shortcode '${shortcode}' created`
      );

      const date = new Date(validity);
      const properDate = date.toISOString().split(".")[0] + "Z";

      return res.status(201).json({
        shortlink: `http://localhost:${process.env.PORT}/${shortcode}`,
        expiry: properDate,
      });
    }

    //if the user has not given short code
    if (!shortcode) {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let generated;

      //to create random short code of length 7
      while (true) {
        generated = "";
        for (let i = 0; i < 7; i++) {
          generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const existing = await urlModel.findOne({shortcode: generated});
        if (!existing) break;
      }

      await urlModel.create({
        shortcode: generated,
        defaulturl: url,
        validity: validity,
      });

      await logmaker(
        "backend",
        "info",
        "handler",
        `Custom shortcode '${shortcode}' created`
      );

      const date = new Date(validity);
      const properDate = date.toISOString().split(".")[0] + "Z";

      return res.status(201).json({
        shortlink: `http://localhost:${process.env.PORT}/${generated}`,
        expiry: properDate,
      });
    }
  } catch (err) {
    console.log(err);
    logmaker("backend", "fatal", "handler", "internal error");
    return res.send("error", err.message);
  }
};

export const getUrlData = async (req, res) => {
  const {id} = req.params;

  try {
    const entry = await urlModel.findOne({shortcode: id});

    if (!entry) {
      await logmaker(
        "backend",
        "error",
        "get-info",
        `Shortcode '${id}' not found`
      );
      return res.status(404).json({msg: "Shortcode not found"});
    }

    const {shortcode, defaulturl, createdAt, expiresAt, clicks} = entry;

    await logmaker("backend", "info", "get-info", `Fetched data for '${id}'`);

    return res.status(200).json({
      original_url: defaulturl,
      shortcode,
      createdAt: createdAt.toISOString().split(".")[0] + "Z",
      expiresAt: expiresAt.toISOString().split(".")[0] + "Z",
      clicks,
    });
  } catch (err) {
    console.error(err);
    await logmaker("backend", "fatal", "get-info", err.message);
    return res.status(500).json({msg: "Internal server error"});
  }
};
