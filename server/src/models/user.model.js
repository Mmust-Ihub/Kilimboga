import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import allRoles from "../config/roles.js";

const geoSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Point", "LineString", "Polygon"],
    default: "Point",
    trim: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    location: {
      type: geoSchema,
      required: true,
      index: "2dsphere",
    },
    role: {
      type: String,
      enum: Object.values(allRoles),
      default: "farmer",
    },
    authCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    documents: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
      trim: true,
    },
    joined: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isNumberTaken = async function (phoneNumber, excludeUserId) {
  const user = await this.findOne({ phoneNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

export const userModel = mongoose.model("User", userSchema);
