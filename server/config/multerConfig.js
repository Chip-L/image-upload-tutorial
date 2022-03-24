const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./"),
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  },
});

exports.upload = multer({
  storage,
});
