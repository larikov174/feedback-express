const router = require('express').Router();
const {
  getPosts,
  // getPostId,
  // createPost,
  // updatePost,
} = require('../controllers/posts');

router.get('/', getPosts);
// router.get('/:postId', getPostId);
// router.post('/', createPost);
// router.patch('/me', updatePost);

module.exports = router;
