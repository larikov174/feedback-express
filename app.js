const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
// использую не локальную базу т.к. веду разработку с нескольких компьютеров
// просто не удобно было каждый раз настраивать одно и тоже.
const db =
  "mongodb+srv://larikov174:2694432@cluster0.mwtfk.mongodb.net/mestodb?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.use((req, res, next) => {
  req.user = {
    _id: "61a7dca476bd4d532b98b6eb",
  };

  next();
});

app.use("/", require("./routers/users"));

app.listen(PORT, (error) => {
  // eslint-disable-next-line
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
