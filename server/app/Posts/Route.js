var express = require('express');
const { verifyAccessToken } = require('../../utils/helpers');

var router = express.Router();
const controller = require('./controller');
const { checkCreatePostParams, checkEditPostParams } = require('./Middleware');


router.post('/', verifyAccessToken, checkCreatePostParams, (req,res,next)=> {
    controller.createdPost(req,res,next)
})

router.get('/', verifyAccessToken, (req,res,next)=> {
    controller.getAllPosts(req,res,next)
})

router.get('/:id',verifyAccessToken, (req,res,next)=> {
    controller.getSinglePost(req,res,next)
})

router.patch('/:id', verifyAccessToken,checkEditPostParams, (req,res,next)=> {
    controller.updatePost(req,res,next)
})

router.put('/like/:id',verifyAccessToken,(req,res,next)=>{
    controller.likePost(req,res,next)
})

router.put('/unlike/:id',verifyAccessToken,(req,res,next)=>{
    controller.dislikePost(req,res,next)
})

module.exports = router;