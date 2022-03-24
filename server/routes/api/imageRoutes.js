const router = require("express").Router();
const { upload } = require("../../config/multerConfig");
const { uploadSingle } = require("../../imageControllers");

router.post("/image", upload.single("image"), uploadSingle);

// export router
module.exports = router;
