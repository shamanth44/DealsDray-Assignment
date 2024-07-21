import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    default: Date.now()
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
