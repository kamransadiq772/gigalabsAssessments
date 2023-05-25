const Joi = require("joi");
const { ResponseObject } = require("../../utils/helpers");
module.exports = {
  
    checkSignUpParams: async (req, res, next) => {
      try {
        const signUp_Schema = Joi.object({
          email: Joi.string().email().required(),     
          password: Joi.string().required(),
          firstName:Joi.string().required(),
          lastName:Joi.string().required(),
          userName:Joi.string().required()
        }).options({
          abortEarly: false
        });
  
        if(req.body.email){
          await signUp_Schema.validateAsync(req.body);
        }
        next();
      } catch (error) {
        console.log(error,"errrorrrrrrr");
        // const msg = error.details?.restructureErrors();
        return ResponseObject(res, {
          status: 400,
          success: false,
          message: JSON.stringify(error),
          data: {},
        });
      }
    },

    checkEditProfileParams: async (req, res, next) => {
      try {
        const signUp_Schema = Joi.object({
          email: Joi.string().email(),     
          firstName:Joi.string(),
          lastName:Joi.string(),
          userName:Joi.string()
        }).options({
          abortEarly: false
        });
  
        if(req.body.email){
          await signUp_Schema.validateAsync(req.body);
        }
        next();
      } catch (error) {
        console.log(error,"errrorrrrrrr");
        // const msg = error.details?.restructureErrors();
        return ResponseObject(res, {
          status: 400,
          success: false,
          message: JSON.stringify(error),
          data: {},
        });
      }
    },

    checkloginUpParams: async (req, res, next) => {
      try {
        const signUp_Schema = Joi.object({
          email: Joi.string().email().required(),     
          password: Joi.string().required()
        }).options({
          abortEarly: false
        });
  
        if(req.body.email){
          await signUp_Schema.validateAsync(req.body);
        }
        next();
      } catch (error) {
        console.log(error,"errrorrrrrrr");
        // const msg = error.details?.restructureErrors();
        return ResponseObject(res, {
          status: 400,
          success: false,
          message: JSON.stringify(error),
          data: {},
        });
      }
    },
  };
  