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
        .status(400)
        .json({ error: "multipart form with 'photo' as key was not provided" });
      return;
    }
    if (req.body.artifactId === undefined || req.body.artifactId === null) {
      res
        .status(400)
        .json({ error: "artifactId to add a photo to must be supplied" });
      return;
    }
    if (req.body.registerId === undefined || req.body.registerId === null) {
      res
        .status(400)
        .json({ error: "registerId to add a photo must be supplied" });
      return;
    }
    let { artifactId, registerId } = req.body;
    try {
      artifactId = parseInt(artifactId);
      registerId = parseInt(registerId);
    } catch (err) {
      res.status(400).json({ error: "unable to parse integer " });
      return;
    }

    if (isNaN(artifactId) || isNaN(registerId)) {
      res.status(400).json({ error: "unable to parse integer" });
      return;
    }

    const email = sha256(res.locals.authenticatedEmail);
    const fileHash = sha256(req.file.buffer);
    let uploadedUrl = "";
    uploadStream(req.file.buffer, {
      public_id: `${email}-${fileHash}`,
      quality: "auto"
    })
      .then(result => {
        return result.secure_url;
      })
      .then(url => {
        uploadedUrl = url;
        return req.app.locals.db.photo.create(
          res.locals.authenticatedEmail,
          registerId,
          artifactId,
          url
        );
      })
      .then(result => {
        res.status(200).json({ message: "created url", url: uploadedUrl });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
};

module.exports = addPhoto;
