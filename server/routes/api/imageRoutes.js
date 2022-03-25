const router = require("express").Router();
const { upload } = require("../../config/multerConfig");
const {
  uploadSingle,
  uploadSingleNoMW,
} = require("../../controllers/imageControllers");

// router.post("/add-image", upload.single("file"), uploadSingle);
router.post("/add-image-no-mw", uploadSingleNoMW);

// export router
module.exports = router;
