const { newAccessToken, ResponseObject } = require("../../utils/helpers");
const bcrypt = require("bcryptjs");
const User = require("./Modal");
const messages = require("./resMsgs/messages");
const redis = require('redis');
const POST = require("../Posts/Modal");



class Controller {
    setter(obj) {
        const keys = Object.keys(obj);

        keys.map((key) => (this[key] = obj[key]));
    }

    // redisClient = redis.createClient({
    //     host: 'localhost', // Replace with your Redis server host
    //     port: 6379, // Replace with your Redis server port
    // });

    async sign_up(req, res, next) {
        try {
            const body = req.body
            console.log(req.body, " body");
            const { email, password, firstName, lastName, userName } = req.body;
            let user = await User.findOne({ email: email });
            const payload = {
                ...body,
                password: bcrypt.hashSync(password, process.env.JWTSALT)
            }

            if (!user) {
                user = await User.create({
                    ...payload
                });

                console.log(payload, "payloadpayload");

                const data = {
                    ...user.toJSON(),
                    token: await newAccessToken(user._id),
                };
                if (user) {
                    this.setter({
                        status: 201,
                        success: true,
                        msg: messages.accountCreation,
                        data,
                    });
                } else {
                    this.setter({
                        status: 500,
                        success: false,
                        msg: messages.serverErr,
                        data,
                    });
                }
            } else {
                this.setter({
                    status: 409,
                    success: false,
                    msg: messages.accountExists,
                    data: {},
                });
            }
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

    async getSingleUSer(req, res) {



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
                const isUserExists = await User.findById(req.params.id);

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

    async getUserPost(req, res) {



        try {
            const cacheKey = req.params.id+"Post"

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
                const isUserExists = await POST.find({user:req.params.id});

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

    async updateUser(req, res, next) {
        try {
            const body = req.body
            if(body.password) delete body.password
            const id = req.params.id
            const isUserExists = await User.findById(id);

            if (!isUserExists) {
                return res.status(409).send({
                    message: messages.userNotExist,
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id,{
                ...body
            },{new:true})

            this.setter({
                status: 200,
                success: true,
                msg: messages.updatedSuccessfully,
                data: updatedUser,
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