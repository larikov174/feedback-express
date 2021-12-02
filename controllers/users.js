const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
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

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
      })
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) =>
      res.send({
        avatar: user.avatar,
      })
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Пользователь в базе не найден.",
      })
    );
};
