const express = require("express");

const routes = require("./routes");

const app = express();
const PORT = 3001;

// set up middleware (parses incoming req as JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Image Upload Tutorial service now listening on ${PORT}`);
});
