const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res.status(500).send({
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "Пользователь по указанному _id не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере. Сервер не отвечает." });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные." });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере. Сервер не отвечает." });
      }
    });
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные." });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере. Сервер не отвечает." });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send({
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные." });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере. Сервер не отвечает." });
      }
    });
};
