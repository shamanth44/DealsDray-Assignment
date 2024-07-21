

const validate = (schema) => async(req, res , next) => {
    try {
        // console.log({image: req.files, ...req.body})
        if(!req.files) {
            throw new Error("Image not found")
        }
        const parseBody = await schema.parseAsync({image: req.files, ...req.body});
        req.body = parseBody;
        next()
    } catch (err) {
        const status = 422
        const message = err.errors[0].message
        const error = {
            status, message
        }
        // res.status(400).json({message: message})
        next(error)
    }
}


const validateLogin = (schema) => async(req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status =422
        const message = err.errors[0].message
        const error = {
            status, message
        }
        // console.log(error)
        // res.status(400).json({message: message})
        next(error)

    }
}

export  { validate, validateLogin };