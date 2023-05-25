const JWT = require("jsonwebtoken");

module.exports = {
    ResponseObject: (res, obj) => {
        return res.status(obj.status).send({
            status: obj.status,
            success: obj.success,
            message: obj.message,
            errors: obj.errors,
            data: obj.data,
        });
    },

    verifyAccessToken: (req, res, next) => {
      console.log(req.headers["authorization"],'header-=-=-=')
      if (!req.headers["authorization"]) {
        return next(
          res.status(404).send({
            status: 404,
            success: false,
            message: "Token not found",
            data: {},
          })
        );
      }
      const header = req.headers["authorization"];
      const token = header.split(' ')[1]
      JWT.verify(token, process.env.SECRETKEY, (err, payload) => {
        if (err) {
          return res.status(401).send({
            status: 401,
            success: false,
            message: "Verification Failed",
            data: {},
          });
        }
  
        req.payload = payload;
        next();
      });
    },

    newAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {
            name: process.env.PROJNAME,
            userId: userId,
          };
          const secret = process.env.SECRETKEY;
          const option =
            process.env.STAGE === "dev"
              ? {
                // expiresIn: process.env.TOKENEXPIRE,
                expiresIn: process.env.TOKENEXPIRE,
                issuer: process.env.ISSUER,
                audience: toString(userId),
              }
              : {
                expiresIn: process.env.TOKENEXPIRE,
                issuer: process.env.ISSUER,
                audience: toString(userId),
              };
          return JWT.sign(payload, secret, option, (err, token) => {
            if (err) return reject(err);
            return resolve(token);
          });
        });
      },
}