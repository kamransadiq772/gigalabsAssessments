const { newAccessToken, ResponseObject } = require("../../utils/helpers");
const bcrypt = require("bcryptjs");
const User = require("./Modal");
const messages = require("./resMsgs/messages");
const redis = require('redis');
const POST = require("./Modal");
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

    async createdPost(req, res, next) {
        try {
            const { userId } = req.payload
            const payload = {
                ...req.body,
                user: userId
            }

            const createdPost = await POST.create(payload)

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

    async getAllPosts(req, res, next) {
        try {
            const isUserExists = await POST.find().populate('user','userName').sort({createdAt:-1});

            this.setter({
                status: 200,
                success: true,
                msg: messages.loginSuccess,
                data: isUserExists
            });

        } catch (error) {
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

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const isUserExists = await User.findOne({ email });

            if (!isUserExists) {
                return res.status(409).send({
                    message: messages.userNotExist,
                });
            }

            const validatePassword = bcrypt.compareSync(
                password,
                isUserExists.password
            );

            if (validatePassword) {
                await User.updateOne(
                    { _id: isUserExists._id },
                    { $set: { deletedAt: null } }
                );
                const data = {
                    ...isUserExists.toJSON(),
                    token: await newAccessToken(isUserExists._id),
                };
                this.setter({
                    status: 200,
                    success: true,
                    msg: messages.loginSuccess,
                    data: data,
                });
            } else {
                this.setter({
                    status: 404,
                    success: false,
                    msg: messages.invalidParams,
                    data: {},
                });
            }
        } catch (error) {
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

    async getSinglePost(req, res) {



        try {
            const cacheKey = req.params.id

            var redisClient = await redis.createClient({
                host: 'http://localhost', // Replace with your Redis server host
                port: 6379, // Replace with your Redis server port
                legacyMode: true
            });

            await redisClient.connect()

            const data = await new Promise((resolve, reject) => {
                redisClient.get(cacheKey, (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });

            if (data) {
                // Data found in cache
                this.setter({
                    status: 200,
                    success: true,
                    msg: messages.loginSuccess,
                    data: JSON.parse(data),
                });
            } else {
                const isUserExists = await POST.findById(req.params.id);

                if (!isUserExists) {
                    return res.status(409).send({
                        message: messages.userNotExist,
                    });
                }

                await new Promise((resolve, reject) => {
                    redisClient.setex(cacheKey, 3600, JSON.stringify(isUserExists), (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });

                this.setter({
                    status: 200,
                    success: true,
                    msg: messages.loginSuccess,
                    data: isUserExists
                });
            }

        } catch (error) {
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

    async updatePost(req, res, next) {
        try {
            const body = req.body
            const id = req.params.id
            const isExists = await POST.findById(id);

            if (!isExists) {
                return res.status(409).send({
                    message: messages.userNotExist,
                });
            }

            const updatedPost = await POST.findByIdAndUpdate(id, {
                ...body
            }, { new: true })

            this.setter({
                status: 200,
                success: true,
                msg: messages.updatedSuccessfully,
                data: updatedPost,
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

    async likePost(req, res, next) {
        try {
            const { userId } = req.payload

            const createdPost = await POST.findByIdAndUpdate(req.params.id, {
                $addToSet: { likedBy: userId }
            }, { new: true })

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

    async dislikePost(req, res, next) {
        try {
            const { userId } = req.payload

            const createdPost = await POST.findByIdAndUpdate(req.params.id, {
                $pull: { likedBy: userId }
            }, { new: true })

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

}

module.exports = new Controller();