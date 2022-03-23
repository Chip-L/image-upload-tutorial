const express = require("express");

const app = express();
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Image Upload Tutorial service now listening on ${PORT}`);
});
