exports.uploadSingle = (req, res, err) => {
  console.log("uploadSingle reached:", req.file);

  // check for bad type
  if (!req.file) {
    // if (err) {
    res.send({
      msg: "uploadSingle: Only image files (jpg, jpeg, png) are allowed!",
      code: 400,
    });
    return;
  }

  console.log("Your image has been updated!");
  res.send({ msg: "Your image has been updated!", code: 200 });
};
