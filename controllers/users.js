const User = require("../models/user");

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};

module.exports.getUserById = (req, res) => {
  console.log(req.params)
  User.findOne({ "_id": req.params.userId })
    .then((user) => res.send({ user }))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      })
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};
