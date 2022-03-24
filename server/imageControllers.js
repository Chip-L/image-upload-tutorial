const uploadSingle = (req, res, err) => {
  // check for type
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    console.log("bad extension");
    res.send({
      msg: "Only image files (jpg, jpeg, png) are allowed!",
      code: 400,
    });

    res.send({ msg: "Your image has been updated!", code: 200 });
  }
};

export { uploadSingle };
