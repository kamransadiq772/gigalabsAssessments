const Joi = require("joi");
const { ResponseObject } = require("../../utils/helpers");
module.exports = {
  
    checkCreatePostParams: async (req, res, next) => {
      try {
        const createPost_Schema = Joi.object({
          title: Joi.string(),     
          content: Joi.string().required()
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
          message: "Invalid Data",
          data: {},
        });
      }
    },

    checkEditPostParams: async (req, res, next) => {
      try {
        const signUp_Schema = Joi.object({
            title: Joi.string(),     
            content: Joi.string()
        }).options({
          abortEarly: false
        });
  
          await signUp_Schema.validateAsync(req.body);
        next();
      } catch (error) {
        console.log(error,"errrorrrrrrr");
        // const msg = error.details?.restructureErrors();
        return ResponseObject(res, {
          status: 400,
          success: false,
          message: "Invalid Data",
          data: {},
        });
      }
    },
  };
  