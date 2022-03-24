const router = require("express").Router();
const { upload } = require("../../config/multerConfig");
const { uploadSingle } = require("../../controllers/imageControllers");

router.post("/add-image", upload.single("file"), uploadSingle);

// export router
module.exports = router;
