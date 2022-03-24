const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./"),
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage,
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Image Upload Tutorial service now listening on ${PORT}`);
});
