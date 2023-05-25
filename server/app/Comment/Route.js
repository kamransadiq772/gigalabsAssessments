var express = require('express');
const { verifyAccessToken } = require('../../utils/helpers');

var router = express.Router();
const controller = require('./controller');
const { checkCreatePostParams, checkEditPostParams, checkCreateCommentParams } = require('./Middleware');


router.post('/', verifyAccessToken, checkCreateCommentParams, (req,res,next)=> {
    controller.createdComment(req,res,next)
})

router.get('/:id',verifyAccessToken, (req,res,next)=> {
    controller.getPostComments(req,res,next)
})

module.exports = router;