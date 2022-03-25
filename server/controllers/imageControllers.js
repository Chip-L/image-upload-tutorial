const multer = require("multer");
const { storage, fileFilter } = require("../config/multerConfig");

exports.uploadSingle = (err, req, res, next) => {
  console.log("uploadSingle reached:");
  console.log("\tfile:", req.file);
  console.log("\terr:", err);

  // check for bad type
  if (err) {
    console.log("uploadSingle: error reached");
    res.send({
      msg: "uploadSingle: Only image files (jpg, jpeg, png) are allowed!",
      code: 400,
    });
    return;
  }

  console.log("Your image has been updated!");
  res.send({ msg: "Your image has been updated!", code: 200 });
};

exports.uploadSingleNoMW = (req, res, next) => {
  console.log("uploadSingleNoMW reached:", req.body);
  const upload = multer({ storage, fileFilter }).single("file");

  // This defines the req.file
  upload(req, res, function (err) {
    console.log("err:", err);
    if (err instanceof multer.MulterError) {
      console.log("MulterError", err);
      res.send({
        msg: "Multer?",
        code: 400,
      });
      return;
    } else if (err) {
      console.log("An unknown error occurred when uploading.");
      res.send({
        msg: "unknown?" + err.message,
        code: 500,
      });
      return;
    }

    console.log("body:", req.body);
    console.log("file:", req.file);
    console.log("everything is ok");
    res.send({ msg: "Your image has been updated!", code: 200 });

    // Everything went fine.
  });
};
