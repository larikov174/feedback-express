const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
// использую не локальную базу т.к. веду разработку с нескольких компьютеров
// просто не удобно было каждый раз настраивать одно и тоже.
// eslint-disable-next-line max-len
const db = "mongodb+srv://larikov174:2694432@cluster0.mwtfk.mongodb.net/mestodb?retryWrites=true&w=majority";

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
    _id: "61aaedc571f3154d172662a7",
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
