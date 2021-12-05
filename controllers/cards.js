const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((Cards) => res.status(200).send(Cards.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(() => res.status(500).send({
      message: 'Ошибка. Сервер не отвечает.',
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => {
    Card.findById(card._id)
      .populate(['owner'])
      .then((newCard) => res.status(200).send(newCard));
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('Not Found'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndDelete(req.params.cardId)
          .populate(['owner', 'likes'])
          .then((deletedCard) => res.status(200).send(deletedCard));
      } else {
        res.status(403).send({ message: 'У вас нет прав на это действие' });
      }
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
      } if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
      }
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('Not Found'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    console.log(err.message);
    if (err.message === 'Not Found') {
      res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
    } if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные.' });
    } else {
      res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('Not Found'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'Not Found') {
      res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
    } if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные.' });
    } else {
      res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
    }
  });
