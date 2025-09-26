import joi from "joi";// for data validation

const signupValidation = (req,res,next) => {
    const schema = joi.object({
        name: joi.string().min(5).max(100).required(), // validation criteria for coming data using joi
        email: joi.string().email().required(),
        password: joi.string().min(6).max(100).required()  
    })

    const {error} = schema.validate(req.body); //validate data , returns error info if it has error
    if (error) {
        return res.status(400).json({message: 'incorrect request', error});
        // execution stops
    }
    // no error, pass control
    next();
}

const loginValidation = (req,res,next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(100).required()  
    })

    const {error} = schema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).json({message: 'incorrect request', error});
    }
    next();
}

export { signupValidation, loginValidation };