import * as Yup from 'yup';


export const login_schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Must have one uppercase letter')
        .matches(/[a-z]/, 'Must have one lowercase letter')
        .matches(/[0-9]/, 'Must have one number')
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, 'Must have one special character')
        .matches(/^[^\s]*$/, 'No spaces allowed')
});

export const sign_up_schema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .max(30, "Name should be at most 30 characters")
        .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
        .test("space-count", "Name can have at most 2 spaces", function (value) {
            return (value?.match(/ /g) || []).length <= 2;
        }),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must have one uppercase letter")
        .matches(/[a-z]/, "Must have one lowercase letter")
        .matches(/[0-9]/, "Must have one number")
        .matches(/[!@#$%^&*()\-_=+[\]{};:',.<>/?\\|]/, "Must have one special character")
        .matches(/^[^\s]*$/, "No spaces allowed"),
});
