import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const { error, value } = schema.validate(req.body, options)

    let message = ''

    if (error) {
        switch (error.details[0].path[0]) {
            case 'first_name':
                message = 'Incorect First Name'
                break
            case 'last_name':
                message = 'Incorect Last Name'
                break
            case 'email':
                message = 'Incorect email'
                break
            case 'password':
                message = 'Incorect password'
                break
            default:
                message = 'Check input fields'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}

export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required()
    })

    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}





export const ratingsValidator = (req, res, next) => {
    const schema = Joi.object({
        rating: Joi.number().required()
    })

    validate(schema, req, res, next)
}


export default validate