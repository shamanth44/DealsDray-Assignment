import zod from "zod";

const signupSchema = zod.object({
    name: zod.string({required_error: "Name is required"}).trim().min(3, {message: "Name must me atleast 3 character"}),
    email: zod.string().email({required_error: "Email is required"}).trim().min(3, {message: "Email must me atleast 3 character"}),
    password: zod.string({required_error: "Password is required"}).trim().min(8, {message: "Password must me atleast 8 character"}),
    image: zod.any()
    .refine((file) =>  file?.image?.length >= 0 ,"Image is required")
    .refine((file) => {return !file?.image?.[0]  || file?.image?.[0]?.size  <= 4000000, 'File size must be less than 4MB'})
    .refine((file) => {return !file?.image?.[0] || ['image/jpeg', 'image/png'].includes(file?.image?.[0]?.mimetype), ' Image is not found Only JPEG and PNG images allowed'})
});

const signinSchema = zod.object({
    email: zod.string().email({message: "Invalid email address", required_error: "Email is required"}).trim().min(3, {message: "Email must me atleast 3 character"}),
    password: zod.string({required_error: "Password is required"}).trim().min(8, {message: "Password must me atleast 8 character"}),
})

const createSchema = zod.object({
    uniqueId: zod.string({required_error: "Unique Id is required"}).trim().min(1, {message: "UniqueId must be atleast 1 character/number"}),
    name: zod.string({required_error: "Name is required"}).trim().min(3, {message: "Name must be atleast 3 character"}),
    email: zod.string().email({required_error: "Email is required"}).trim().min(3, {message: "Email must be atleast 3 character"}),
    mobileNo: zod.string({required_error: "Mobile number is required",  invalid_type_error: "Mobile number must be a number",}).min(10, {message: "Mobile number must be atleast 10 digits"}).transform(str => Number(str)),
    image: zod.any()
    .refine((file) =>  file?.image?.length >= 0 ,"Image is required")
    .refine((file) => {return !file?.image?.[0]  || file?.image?.[0]?.size  <= 4000000, 'File size must be less than 4MB'})
    .refine((file) => {return !file?.image?.[0] || ['image/jpeg', 'image/png'].includes(file?.image?.[0]?.mimetype), ' Image is not found Only JPEG and PNG images allowed'}),
    designation: zod.string({required_error: "Designation is required"}).trim().min(1, {message: "Designation must be atleast 1 character"}),
    gender: zod.string({required_error: "Gender is required"}).trim().min(4, {message: "Gender must be atleast 4 character"}),
    course: zod.string({required_error: "Course is required"}).trim().min(3, {message: "Course must be atlest 3 character"})

})



const updateSchema = zod.object({
    uniqueId: zod.string({required_error: "Unique Id is required"}).min(1, {message: "Unique Id must be atleast 1 character"}),
    name: zod.string({required_error: "Name is required"}).trim().min(3, {message: "Name must be atleast 3 character"}),
    email: zod.string().email({required_error: "Email is required"}).trim().min(3, {message: "Email must be atleast 3 character"}),
    mobileNo: zod.string({required_error: "Mobile number is required",  invalid_type_error: "Mobile number must be a number",}).min(10, {message: "Mobile number must be atleast 10 digits"}).transform(str => Number(str)),
    image: zod.any()
    .refine((file) =>  file?.image?.length >= 0 ,"Image is required")
    .refine((file) => {return !file?.image?.[0]  || file?.image?.[0]?.size  <= 4000000, 'File size must be less than 4MB'})
    .refine((file) => {return !file?.image?.[0] || ['image/jpeg', 'image/png'].includes(file?.image?.[0]?.mimetype), ' Image is not found Only JPEG and PNG images allowed'}),
    designation: zod.string({required_error: "Designation is required"}).trim().min(3, {message: "Designation must be atleast 3 character"}),
    gender: zod.string({required_error: "Gender is required"}).trim().min(4, {message: "Gender must be atleast 4 character"}),
    course: zod.string({required_error: "Course is required"}).trim().min(3, {message: "Course must be atlest 3 character"})

})


export  { signupSchema, updateSchema, createSchema, signinSchema };