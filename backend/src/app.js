import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
// const allowedOrigins = process.env.CORS_ORIGIN
const corsOptions = {
    origin: process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
    // Add other CORS options if needed (e.g., methods, headers)
  };



app.use(cors(
  {
  origin: corsOptions,
  // origin: "http://192.168.1.3:5173",
  // origin: `${process.env.CORS_ORIGIN}`,
    // origin: ["http://localhost:5173", "https://employee-dashboard-ashen.vercel.app"],
    credentials: true
    }
))
// app.use(express.json({limit: "16kb"}))
app.use(bodyParser.json())
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(bodyParser.urlencoded({extended: true, limit: "5mb"}))

app.use(express.static("public"))
app.use(cookieParser())

// console.log(process.env.CORS_ORIGIN)
// routes

import adminRouter from "./routes/admin.routes.js";
import employeeRouter from "./routes/employee.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";


// app.use(adminRouter)


app.get("/", (req, res) => {
  res.send("Server")
})

app.use("/api/v1/admin", adminRouter) // https://deals-dray-assignment.vercel.app/api/v1/admin/register

app.use("/api/v1/employee", employeeRouter) // https://deals-dray-assignment.vercel.app/api/v1/employee/create-employee

app.use(errorMiddleware)
// app.use(  async function (
//   error,
//   req,
//   res,
//   next
// ) {
  

//   if (error instanceof ApiError) {
//     ApiError.sendError(res, error.statusCode, error.message);
//   }

//   if (error.name === "ValidationError") {
//     ApiError.handleValidationError(res, error.message);
//   }

//   if (res.headersSent) {
//     return;
//   }

//   ApiError.handleServerError(res);
// })





export { app }