import Joi from "joi";

function validate(schema, data) {
  switch (schema) {
    case "signUp":
      return signUpSchema.validate(data);
    case "login":
      return loginSchema.validate(data);
    case "product":
      return productSchema.validate(data);
    case "firstName":
      return firstName.validate(data);
    case "lastName":
      return lastName.validate(data);
    case "email":
      return email.validate(data);
    case "password":
      return password.validate(data);
    case "phoneNumber":
      return phoneNumber.validate(data);
    case "productName":
      return productName.validate(data);
    case "productDescription":
      return productDescription.validate(data);
    case "productCategory":
      return productCategory.validate(data);
    case "productQuantity":
      return productQuantity.validate(data);
    case "productPrice":
      return productPrice.validate(data);
    case "otp":
      return otp.validate(data);
    default:
      return { error: "Invalid schema" };
  }
}

const otp = Joi.object({
  otp: Joi.string().alphanum().min(5).max(5).required().messages({
    "string.alphanum": "OTP must only contain letters and numbers.",
    "string.min": "OTP must be at least 6 characters long.",
    "string.max": "OTP must not exceed 6 characters.",
    "any.required": "OTP is required.",
  }),
});

const firstName = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .pattern(new RegExp("^[A-Za-z']+$"))
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Special characters are not allowed",
      "string.min": "First name must be at least 3 characters long.",
      "string.max": "First name must not exceed 30 characters.",
      "string.pattern.base": "First name must only contain letters.",
      "any.required": "First name is required.",
      "string.empty": "First name cannot be empty.",
    }),
});

const lastName = Joi.object({
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .pattern(new RegExp("^[A-Za-z']+$"))
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Special characters are not allowed",
      "string.pattern.base": "Last name must only contain letters.",
      "string.min": "Last name must be at least 3 characters long.",
      "string.max": "Last name must not exceed 30 characters.",
      "any.required": "Last name is required.",
      "string.empty": "Last name cannot be empty.",
    }),
});

const email = Joi.object({
  email: Joi.string()
    // Use Joi's built-in email validation and allow any valid TLD.
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty",
    }),
});

const password = Joi.object({
  password: Joi.string()
    // .alphanum()
    .min(6)
    // .pattern(new RegExp('^[a-zA-Z0-9]$'))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
});

const phoneNumber = Joi.object({
  phoneNumber: Joi.string()
    .pattern(new RegExp("^(01|07)[0-9]{8}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must start with 01 or 07 and be 10 digits long.",
      "any.required": "Phone number is required.",
    }),
});

const signUpSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .alphanum()
    .pattern(new RegExp("^[A-Za-z']+$"))
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Special characters are not allowed",
      "string.pattern.base": "First name must only contain letters.",
      "string.min": "First name must be at least 3 characters long.",
      "string.max": "First name must not exceed 30 characters.",
      "any.required": "First name is required.",
      "string.empty": "First name cannot be empty.",
    }),

  lastName: Joi.string()
    .min(3)
    .alphanum()
    .pattern(new RegExp("^[A-Za-z']+$"))
    .max(30)
    .required()
    .messages({
      "string.alphanum": "Special characters are not allowed",
      "string.pattern.base": "Last name must only contain letters.",
      "string.min": "Last name must be at least 3 characters long.",
      "string.max": "Last name must not exceed 30 characters.",
      "any.required": "Last name is required.",
      "string.empty": "Last name cannot be empty.",
    }),

  email: Joi.string()
    // Accept any valid email address (allow any TLD). Remove the restrictive custom pattern.
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),

  phoneNumber: Joi.string()
    .pattern(new RegExp("^(01|07)[0-9]{8}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must start with 01 or 07 and be 10 digits long.",
      "any.required": "Phone number is required.",
    }),
})
  .with("firstName", "lastName")
  .with("email", "password")
  .with("phoneNumber", "email");

const loginSchema = Joi.object({
  email: Joi.string()
    // Use Joi's email validator and allow any valid TLDs; remove the custom pattern restriction.
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
}).with("email", "password");

const productSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .pattern(new RegExp("^(?=.*[a-zA-Z]).*$"))
    .max(30)
    .required()
    .messages({
      "string.min": "Product name must be at least 3 characters long.",
      "string.max": "Product name must not exceed 30 characters.",
      "string.pattern.base": "Product name must contain letters",
      "string.empty": "Product name cannot be empty.",
      "any.required": "Product name is required.",
    }),

  productDescription: Joi.string()
    .min(10)
    .pattern(new RegExp("^(?=.*[a-zA-Z]).*$"))
    .max(100)
    .required()
    .messages({
      "string.min": "Product description must be at least 10 characters long.",
      "string.max": "Product description must not exceed 100 characters.",
      "string.empty": "Product description cannot be empty.",
      "string.pattern.base": "Product description must contain letters",
      "any.required": "Product description is required.",
    }),

  productCategory: Joi.string().min(3).max(100).required().messages({
    "string.min": "Product category must be at least 3 characters long.",
    "string.max": "Product category must not exceed 100 characters.",
    "string.empty": "Product category cannot be empty.",
    "any.required": "Product category is required.",
  }),

  productQuantity: Joi.number().integer().min(1).messages({
    "number.integer": "Product quantity must be an integer.",
    "number.min": "Product quantity must be at least 1.",
    "number.empty": "Product quantity cannot be empty.",
    "any.required": "Product quantity is required.",
  }),

  productPrice: Joi.number().integer().min(1).messages({
    "number.integer": "Product price must be an integer.",
    "number.min": "Product price must be at least 1.",
    "number.empty": "Product price cannot be empty.",
    "any.required": "Product price is required.",
  }),
})
  .with("productName", "productDescription")
  .with("productQuantity", "productPrice")
  .with("productCategory", "productName")
  .with("productName", "productDescription");

const productName = Joi.object({
  productName: Joi.string()
    .min(3)
    .pattern(new RegExp("^(?=.*[a-zA-Z]).*$"))
    .max(30)
    .required()
    .messages({
      "string.min": "Product name must be at least 3 characters long.",
      "string.max": "Product name must not exceed 30 characters.",
      "string.empty": "Product name cannot be empty.",
      "string.pattern.base": "Product name must contain letters",
      "any.required": "Product name is required.",
    }),
});

const productDescription = Joi.object({
  productDescription: Joi.string()
    .min(10)
    .pattern(new RegExp("^(?=.*[a-zA-Z]).*$"))
    .max(100)
    .required()
    .messages({
      "string.min": "Product description must be at least 10 characters long.",
      "string.max": "Product description must not exceed 100 characters.",
      "string.empty": "Product description cannot be empty.",
      "string.pattern.base": "Product description must contain letters",
      "any.required": "Product description is required.",
    }),
});

const productCategory = Joi.object({
  productCategory: Joi.string().min(3).max(100).required().messages({
    "string.min": "Product category must be at least 3 characters long.",
    "string.max": "Product category must not exceed 100 characters.",
    "string.empty": "Product category cannot be empty.",
    "any.required": "Product category is required.",
  }),
});

const productQuantity = Joi.object({
  productQuantity: Joi.number().integer().min(1).messages({
    "number.integer": "Product quantity must be an integer.",
    "number.empty": "Product quantity cannot be empty.",
    "any.required": "Product quantity is required.",
    "number.base": "Product quantity must be a number.",
    "number.min": "Product quantity must be at least 1.",
  }),
});

const productPrice = Joi.object({
  productPrice: Joi.number().integer().min(1).messages({
    " number.integer": "Product price must be an integer.",
    "number.empty": "Product price cannot be empty.",
    "number.base": "Product price must be a number",
    "number.min": "Product price must be at least 1",
    "any.required": "Product price is required.",
  }),
});

export default validate;
