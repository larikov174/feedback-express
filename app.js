const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const db = "mongodb://localhost:27017/mestodb";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "61ab8f818476b415c46e9ab4",
  };
  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, (error) => {
  // eslint-disable-next-line
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
