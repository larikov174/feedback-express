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
    title, category, description, status,
  } = req.body;
  Post.create({
    title, category, description, status, owner: req.user._id,
  }).then((post) => {
    Post.findById(post._id)
      .populate(['owner'])
      .then((newPost) => res.status(200).send(newPost));
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
      }
    });
};

module.exports.updatePost = (req, res) => {
  const {
    title, category, description, status,
  } = req.body;
  Post.findByIdAndUpdate(req.params.postId, {
    title, category, description, status,
  }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((post) => res.status(200).send({
      title: post.title,
      category: post.category,
      description: post.description,
      status: post.status,
    }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).send({ message: 'Ошибка. Сервер не отвечает.' });
      }
    });
};

module.exports.deletePost = (req, res) => {
  Post.findById(req.params.postId)
    .orFail(new Error('Not Found'))
    .then((post) => {
      if (post.owner.equals(req.user._id)) {
        Post.findByIdAndDelete(req.params.postId)
          .populate(['owner', 'comments'])
          .then((deletedPost) => res.status(200).send(deletedPost));
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

module.exports.likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $addToSet: { upvotes: req.user._id } },
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
};

module.exports.dislikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { upvotes: req.user._id } },
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
};
