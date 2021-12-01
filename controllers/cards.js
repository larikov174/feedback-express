const User = require("../models/card");

module.exports.getCard = (req, res) => {
  User.find({})
    .then((card) =>
      res.send({
        name: card.name,
        avatar: card.avatar,
        likes: card.likes,
        owner: req.user._id,
      })
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Карточка в базе не найден.",
      })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  User.create({ name, link, owner, likes, createdAt })
    .then((card) =>
      res.send({
        name: card.name,
        avatar: card.avatar,
        likes: card.likes,
        owner: req.user._id,
      })
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Карточка в базе не найден.",
      })
    );
};
