const zod = require('zod');

const UsernameSchema = zod.string().min(6, "username too small {min: 6}");
const PasswordSchema = zod.string({ required_error: "password is required" }).min(5, "password too small").max(30 , "password too big");

function InputValidation(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let InputErrors = [];

    const UsernameValid = UsernameSchema.safeParse(username);
    const PasswordValid = PasswordSchema.safeParse(password);

    if (!UsernameValid.success) {
        UsernameValid.error.errors.forEach((error) => {
            InputErrors.push(error.message);
        });
    }

    if (!PasswordValid.success) {
        PasswordValid.error.errors.forEach((error) => {
            InputErrors.push(error.message);
        });
    }

    if (InputErrors.length > 0) {
        InputErrors.forEach((error)=>{
            req.flash('SchemaError', error);
        })
        res.redirect('/auth/register');
    } else {
        next();
    }
}

module.exports = InputValidation;
