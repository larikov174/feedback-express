const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((Cards) =>
      res.status(200).send(Cards.sort((a, b) => b.createdAt - a.createdAt))
    )
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => {
    Card.findById(card._id)
      .populate(["owner"])
      .then((newCard) => res.status(200).send(newCard))
      .catch(() =>
        res.status(400).send({
          message: "Переданы некорректные данные.",
        })
      );
  });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id).then((card) => {
    if (card.owner.toString() === req.user._id.toString()) {
      Card.findByIdAndDelete(req.user._id)
        .populate(["owner", "likes"])
        .then((deletedCard) => res.status(200).send(deletedCard))
        .catch(() =>
          res.status(500).send({
            message: "Произошла ошибка на сервере. Сервер не отвечает.",
          })
        );
    }
  });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      })
    );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(card))
    .catch(() =>
      res.status(500).send({
        message: "Произошла ошибка на сервере. Сервер не отвечает.",
      })
    );
