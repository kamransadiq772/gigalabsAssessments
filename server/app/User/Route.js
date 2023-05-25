var express = require('express');
const { verifyAccessToken } = require('../../utils/helpers');

var router = express.Router();
const controller = require('./Controller')
const { checkSignUpParams, checkloginUpParams, checkEditProfileParams } = require('./Middleware');
const User = require('./Modal');


router.post('/', checkSignUpParams, (req,res,next)=> {
    controller.sign_up(req,res,next)
})

router.get('/', async(req,res,next)=> {
    const users = await User.find()
    res.status(200).json(users)
})

router.post('/login', checkloginUpParams, (req,res,next)=> {
    controller.login(req,res,next)
})

router.get('/:id',verifyAccessToken, (req,res,next)=> {
    controller.getSingleUSer(req,res,next)
})

router.get('/:id/posts',verifyAccessToken, (req,res,next)=> {
    controller.getUserPost(req,res,next)
})

router.patch('/:id',verifyAccessToken, checkEditProfileParams, (req,res,next)=> {
    controller.updateUser(req,res,next)
})

module.exports = router;