class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stact = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;

    if (stact) {
      this.stact = stact;
    } else {
      Error.captureStackTrace(this, this.construtor);
    }
  }
}

// class ApiError extends Error {
//   constructor( statusCode,
//     message = "Something went wrong",
//     error = [],
//     stact = "") {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.error = error;
//     this.name = "ApiError";
//     if (stact) {
//         this.stact = stact;
//       } else {
//         Error.captureStackTrace(this, this.construtor);
//       }
//   }

  

//    sendError(res, statusCode, message) {
//     res.status(statusCode).json({ error: { message } });
//   }

//    handleValidationError(res, errors) {
//     res.status(400).json({ error: { message: "Validation failed", errors } });
//   }

//    handleServerError(res) {
//     res.status(500).json({ error: { message: "Internal server error" } });
//   }
// }

export { ApiError };
