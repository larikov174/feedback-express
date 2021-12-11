const router = require('express').Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  // getPostId,
} = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);
// router.get('/:postId', getPostId);

module.exports = router;
