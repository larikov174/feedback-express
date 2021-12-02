const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
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
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) =>
      res.send({
        name: card.name,
        link: card.link,
        owner: req.user._id,
      })
    )
    .catch(() =>
      res.status(400).send({
        message: "Переданы некорректные данные.",
      })
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.user._id)
    .then(() => res.status(200).send({ message: "Карточка удалена успешно!" }))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      })
    );
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).catch(() =>
    res.status(500).send({
      message: "Произошла ошибка на сервере. Сервер не отвечает.",
    })
  );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).catch(() =>
    res.status(500).send({
      message: "Произошла ошибка на сервере. Сервер не отвечает.",
    })
  );
