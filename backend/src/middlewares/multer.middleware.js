import multer from "multer";
// import { fileSchema } from "./authValidater.middleware";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./public/temp");
  // },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });


// export const validateFile = async (req, res, next) => {
//   try {
//       const { file } = req; // Access uploaded file from request
//       await fileSchema.parseAsync({ file }); // Validate using the schema
//       next(); // Continue processing if validation succeeds
//   } catch (error) {
//       console.error(error); // Log the error for debugging
//       res.status(400).json({ message: 'Invalid file: ' + error.issues[0].message }); // Send error response
//   }
// };
