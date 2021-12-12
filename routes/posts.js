const router = require('express').Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);
router.put('/:postId/upvotes', likePost);
router.delete('/:postId/upvotes', dislikePost);

module.exports = router;
