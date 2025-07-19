const express = require("express");

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", require("./src/routers/index"));

app.get("/", (req, res) => {
  return res.json({
    sucess: true,
    message: "Backend is running well",
  });
});
app.listen(8080, () => {
  console.log("Listening on Port 8080");
});
