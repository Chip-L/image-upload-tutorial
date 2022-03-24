const router = require("express").Router();
const path = require("path");

router.post("/image", upload.single("image"), uploadSingle(req, res, err));

// export router
module.exports = router;
