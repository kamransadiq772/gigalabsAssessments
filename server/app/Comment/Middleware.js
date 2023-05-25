const Joi = require("joi");
const { ResponseObject } = require("../../utils/helpers");
module.exports = {
  
    checkCreateCommentParams: async (req, res, next) => {
      try {
        const createPost_Schema = Joi.object({
          content: Joi.string().required(),
          post: Joi.string().required()
        }).options({
          abortEarly: false
        });
  
          await createPost_Schema.validateAsync(req.body);
        next();
      } catch (error) {
        console.log(error,"errrorrrrrrr");
        // const msg = error.details?.restructureErrors();
        return ResponseObject(res, {
          status: 400,
          success: false,
          message: error,
          data: {},
        });
      }
    },
  };
  