const { newAccessToken, ResponseObject } = require("../../utils/helpers");
const bcrypt = require("bcryptjs");
const User = require("./Modal");
const messages = require("./resMsgs/messages");
const redis = require('redis');
const POST = require("./Modal");
const Comment = require("./Modal");
const { default: mongoose } = require("mongoose");



class Controller {
    setter(obj) {
        const keys = Object.keys(obj);

        keys.map((key) => (this[key] = obj[key]));
    }

    // redisClient = redis.createClient({
    //     host: 'localhost', // Replace with your Redis server host
    //     port: 6379, // Replace with your Redis server port
    // });

    async createdComment(req, res, next) {
        try {
            const { userId } = req.payload
            const payload = {
                ...req.body,
                user: userId
            }

            const createdPost = await Comment.create(payload)

            this.setter({
                status: 200,
                success: true,
                msg: messages.accountCreation,
                data: createdPost,
            });
        } catch (error) {
            console.log(error, "ERROR");
            this.setter({
                status: 500,
                success: false,
                msg: messages.typeError,
                data: {},
            });
        }

        return ResponseObject(res, {
            status: this.status,
            success: this.success,
            message: this.msg,
            data: this.data,
        });
    }

    async getPostComments(req, res) {

        try {

            const postComments = await Comment.find({post:new mongoose.Types.ObjectId(req.params.id)}).populate('user','userName').sort({createdAt:-1})

            this.setter({
                status: 200,
                success: true,
                msg: messages.loginSuccess,
                data: postComments
            });

        } catch(error) {
        console.log(error, "error");
        this.setter({
            status: 500,
            success: false,
            msg: messages.serverErr,
            data: {},
        });
    }
        return ResponseObject(res, {
        status: this.status,
        success: this.success,
        message: this.msg,
        data: this.data,
    });
    }

}

module.exports = new Controller();