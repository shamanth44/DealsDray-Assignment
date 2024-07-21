import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../controllers/employee.controller.js";
import { createSchema, updateSchema } from "../middlewares/authValidator.js";
import { validate } from "../middlewares/validator.js";


const router = Router();

router
  .route("/create-employee")
  .post(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    validate(createSchema),
    createEmployee
  );
  
  router
  .route("/get-employees")
  .get(
    verifyJwt,
    getAllEmployees
  );

  router
  .route("/get-employee/:id")
  .get(
    verifyJwt,
    getEmployee
  );
  
router
  .route("/update-employee/:id")
  .put(
    verifyJwt,
    upload.fields([{ name: "image", maxCount: 1 }]),
    validate(updateSchema),
    updateEmployee
  );
  

  router
  .route("/delete-employee/:id")
  .delete(
    verifyJwt,
    deleteEmployee
  );

  

export default router;
