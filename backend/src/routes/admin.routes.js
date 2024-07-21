import { Router } from "express";
import {  getAdminDetails, loginAdmin, logoutAdmin, refreshAccessToken, registerAdmin } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {signinSchema, signupSchema} from "../middlewares/authValidator.js";
import { validate, validateLogin } from "../middlewares/validator.js";

const router = Router();


router
  .route("/register")
  .post( upload.fields([{ name: "image", maxCount: 1 }]), validate(signupSchema), registerAdmin);

  router.route("/login").post( validateLogin(signinSchema), loginAdmin)
  router.route("/get-admin").get(verifyJwt, getAdminDetails)

  //secured router

  router.route("/logout").post(verifyJwt, logoutAdmin)

  router.route("/refresh-token").post( refreshAccessToken )

  // https://employee-dashboard-backend-three.vercel.app/api/v1/admin/refresh-token

export default router;
