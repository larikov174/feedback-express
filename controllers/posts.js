const Post = require('../models/post');

module.exports.getPosts = (req, res) => {
  Post.find({})
    .populate(['owner', 'comments'])
    .then((posts) => res.status(200).send(posts.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(() => res.status(500).send({
      message: 'Ошибка. Сервер не отвечает.',
    }));
};

module.exports.createPost = (req, res) => {
  const {
    title, category, status, description,
  } = req.body;
  Post.create({
    title, category, status, description, owner: req.user._id,
  }).then((post) => {
    Post.findById(post._id)
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
  Post.findById(req.params.postId)
    .orFail(new Error('Not Found'))
    .then((post) => {
      if (post.owner.equals(req.user._id)) {
        Post.findByIdAndDelete(req.params.postId)
          .populate(['owner', 'comments', 'replies'])
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

// module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } },
//   { new: true },
// )
//   .orFail(new Error('Not Found'))
//   .then((card) => res.status(200).send(card))
//   .catch((err) => {
//     console.log(err.message);
//     if (err.message === 'Not Found') {
//       res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
//     } if (err.name === 'CastError') {
//       res.status(400).send({ message: 'Переданы некорректные данные.' });
//     } else {
//       res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
//     }
//   });

// module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } },
//   { new: true },
// )
//   .orFail(new Error('Not Found'))
//   .then((card) => res.status(200).send(card))
//   .catch((err) => {
//     if (err.message === 'Not Found') {
//       res.status(404).send({ message: 'Карточка по указанному _id не найдена' });
//     } if (err.name === 'CastError') {
//       res.status(400).send({ message: 'Переданы некорректные данные.' });
//     } else {
//       res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
//     }
//   });
