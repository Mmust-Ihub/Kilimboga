import mongoose from "mongoose";

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

const greenHouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    plant: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: geoSchema,
      required: true,
      index: "2dsphere",
    },
    schedule: {
      type: String,
      default: null,
      trim: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const greenHouseModel = mongoose.model("Green", greenHouseSchema);
