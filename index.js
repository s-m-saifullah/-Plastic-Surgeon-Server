const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middle wares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Plastic Surgeon Service Website is Running.");
});

app.listen(port, () =>
  console.log(`Plastic Surgeon Service Website is Running on Port ${port}`)
);
