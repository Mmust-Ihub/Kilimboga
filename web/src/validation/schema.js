import Joi from 'joi'

function validate(schema, data) {
    switch (schema) {
        case 'signUp':
            return signUpSchema.validate(data)
        case 'login':
            return loginSchema.validate(data)
        case 'firstName':
            return firstName.validate(data)
        case 'lastName':
            return lastName.validate(data)
        case 'email':
            return email.validate(data)
        case 'password':
            return password.validate(data)
        case 'phoneNumber':
            return phoneNumber.validate(data)
        default:
            return { error: 'Invalid schema' }
    }
}

const firstName = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'First name must only contain letters and numbers.',
            'string.min': 'First name must be at least 3 characters long.',
            'string.max': 'First name must not exceed 30 characters.',
            'any.required': 'First name is required.',
        }),
})

const lastName = Joi.object({
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Last name must only contain letters and numbers.',
            'string.min': 'Last name must be at least 3 characters long.',
            'string.max': 'Last name must not exceed 30 characters.',
            'any.required': 'Last name is required.',
        }),
})

const email = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.',
        }),
})

const password = Joi.object({
    password: Joi.string()
        // .alphanum()
        .min(6)
        // .pattern(new RegExp('^[a-zA-Z0-9]$'))
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.',
        }),
})

const phoneNumber = Joi.object({
    phoneNumber: Joi.string()
        .pattern(new RegExp('^(01|07)[0-9]{8}$'))
        .required()
        .messages({
            'string.pattern.base': 'Phone number must start with 01 or 07 and be 10 digits long.',
            'any.required': 'Phone number is required.',
        }),
})

const signUpSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'First name must only contain letters and numbers.',
            'string.min': 'First name must be at least 3 characters long.',
            'string.max': 'First name must not exceed 30 characters.',
            'any.required': 'First name is required.',
        }),
    
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Last name must only contain letters and numbers.',
            'string.min': 'Last name must be at least 3 characters long.',
            'string.max': 'Last name must not exceed 30 characters.',
            'any.required': 'Last name is required.',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.',
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.',
        }),

    phoneNumber: Joi.string()
        .pattern(new RegExp('^(01|07)[0-9]{8}$'))
        .required()
        .messages({
            'string.pattern.base': 'Phone number must start with 01 or 07 and be 10 digits long.',
            'any.required': 'Phone number is required.',
        }),
})
    .with('firstName', 'lastName')
    .with('email', 'password') 
    .with('phoneNumber', 'email')

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.',
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'any.required': 'Password is required.',
        }),
})
    .with('email', 'password')

export default validate
