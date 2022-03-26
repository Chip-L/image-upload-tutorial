const multer = require("multer");

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/"),
  filename: (req, file, cb) => {
    // split the file.originalname into components with a dot (so we can capture the extension)
    const origFullName = file.originalname.split(".");
    // capture the extension
    const ext = origFullName.pop();
    // redo the filename portion removing any spaces and replacing them with hyphens
    const fileName = origFullName.join(".").split(" ").join("-");

    // create the filename to be saved
    cb(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    console.log("good extension");
    cb(null, true);
  } else {
    console.log("bad extension");
    //throw an appropriate multer error so we can catch it later.
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const maxSize = 1 * 1024 * 1024; // for 1MB
// const maxSize = 1 * 1024; // for 1KB
exports.limits = { fileSize: maxSize };

// this is actually not used, this is needed if multer is used as a middleware
exports.upload = multer({
  storage: this.storage,
  fileFilter: this.fileFilter,
  limits: this.limits,
});
