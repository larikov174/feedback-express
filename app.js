const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const db =
  "mongodb+srv://larikov174:2694432@cluster0.mwtfk.mongodb.net/mestodb?retryWrites=true&w=majority";

const app = express();
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
