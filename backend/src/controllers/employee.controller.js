import { Employee } from "../models/employeeDetails.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEmployee = asyncHandler(async (req, res) => {
  try {
  const { uniqueId, name, email, mobileNo, designation, gender, course } =
    req.body;

  if (
    [uniqueId, name, email, designation, gender, course].some(
      (field) => field?.trim() === ""
    ) && typeof(mobileNo) === Number
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedEmployee = await Employee.findOne({
    $or: [{ uniqueId }, { name }, { email }, { mobileNo }],
  });

  if (existedEmployee) {
    throw new ApiError(409, "Employee already existed");
  }

  const imageLocalPath = req.files?.image[0].path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const employee = await Employee.create({
    uniqueId,
    name,
    email,
    mobileNo,
    designation,
    gender,
    course,
    image: image.secure_url,
  });

  if (!employee) {
    throw new ApiError(500, "Something went wrong while creating employee");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, employee, "Employee created successfully"));
  } catch (error) {
    res.json(new ApiError(402, error))
      throw new ApiError(500, "Something went wrong");
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const allEmployees = await Employee.find({});

  if (!allEmployees) {
    throw new ApiError(500, "Something went wrong while fetching employees");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, allEmployees, `Employees fetched successfully, total employees are ${allEmployees.length}`)
    );
});

const getEmployee = asyncHandler(async(req, res) => {
  const id = req.params.id
  const employee = await Employee.findById({_id: id})

  return res
  .json(
    new ApiResponse(200, employee, "Employee fetched successfully")
  )
})

const updateEmployee = asyncHandler(async (req, res) => {
  const { uniqueId, name, email, mobileNo, designation, gender, course } =
    req.body;
  const id = req.params.id;

  if (
    [uniqueId, name, email, designation, gender, course].some(
      (field) => field?.trim() === "" && typeof(mobileNo) === Number
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const imageLocalPath = req.files?.image[0].path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const updateEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      uniqueId,
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image: image.secure_url,
    }
  );

  if (!updateEmployee) {
    throw new ApiError(500, "Something went wrong while updating employee");
  }

  const updatedEmployee = await Employee.findById(updateEmployee._id);

  return res
    .status(201)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee updated successfully")
    );
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deleteEmployee = await Employee.findByIdAndDelete({ _id: id });

  if (!deleteEmployee) {
    throw new ApiError(500, "Something went wrong while deleting employee");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "Employee deleted successfully"));
});

export { createEmployee, updateEmployee, deleteEmployee, getAllEmployees, getEmployee };
