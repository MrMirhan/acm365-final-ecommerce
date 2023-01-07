const express = require('express');
const {
    getAllBlogs,
    getBlog,
    getAddBlog,
    addBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');


const router = express.Router();

router.get('/blog/add', getAddBlog);
router.post('/blog/all', getAllBlogs);
router.post('/blog/get/:id', getBlog);
router.post('/blog/add', addBlog);
router.post('/blog/update/:id', updateBlog);
router.post('/blog/delete/:id', deleteBlog);

module.exports = {
    routes: router
}