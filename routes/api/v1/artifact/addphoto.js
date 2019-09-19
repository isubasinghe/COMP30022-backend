"use strict";
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const sha = require("sha.js");

const upload = multer({ storage: multer.memoryStorage() }).single("photo");

const sha256 = message => {
  return sha("sha256")
    .update(message)
    .digest("hex");
};

// Callbacks are gross, define a promise to upload_stream
function uploadStream(fileBuffer, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(fileBuffer);
  });
}

const addPhoto = (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (req.file.buffer === undefined || req.file.buffer === null) {
      res
        .status(402)
        .json({ error: "multipart form with 'photo' as key was not provided" });
      return;
    }
    if (req.body.artifactId === undefined || req.body.artifactId === null) {
      res
        .status(402)
        .json({ error: "artifactId to add a photo to must be supplied" });
      return;
    }
    const email = sha256("subasingheisitha@gmail.com");
    const fileHash = sha256(req.file.buffer);
    console.log(req.file.buffer);
    uploadStream(req.file.buffer, { public_id: `${email}-${fileHash}` })
      .then(result => {
        return result.secure_url;
      })
      .then(url => {
        return req.app.locals.db.photo.create(
          "subasingheisitha@gmail.com",
          8,
          21,
          url
        );
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
};

module.exports = addPhoto;
