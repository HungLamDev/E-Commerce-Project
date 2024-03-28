const express = require("express");
require("dotenv").config();
const dbConennct = require("./config/dbconnect");
const initRouter = require("./routes");
var cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConennct();
initRouter(app);

app.use("/", (req, res) => {
  res.send("SERVER ONNNNN");
});
app.listen(port, () => {
  console.log("server running on the port: " + port);
});
