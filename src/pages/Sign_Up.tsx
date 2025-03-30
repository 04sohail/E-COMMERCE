import { useFormik } from "formik";
import { sign_up_schema } from "../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import { UserServices } from "../services/api";
import { User } from "../types/types";
import { useState } from "react";
import { useRef } from "react";

const initialValues = {
    id: "",
    name: "",
    email: "",
    password: "",
};

const USER_SERVICES_INSTANCE = new UserServices();

export default function Signup() {
    const error = useRef<HTMLParagraphElement | null>(null)
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const formik = useFormik({
        initialValues,
        validationSchema: sign_up_schema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitError(null);
                values.id = Date.now().toString();
                const response = await USER_SERVICES_INSTANCE.PostUsers(values as User);
                if (response) {
                    navigate('/');
                } else {
                    error.current?.classList.remove("hidden")
                    error.current?.classList.add("block")
                }
            } catch (error) {
                console.error("Error posting user data:", error);
                setSubmitError(error instanceof Error ? error.message : "An error occurred during signup");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formik.setTouched({
            name: true,
            email: true,
            password: true,
        });
        formik.handleSubmit();
    };

    return (

        <div className="wrapper signUp">
            <div className="illustration sign-up-illustration">
                <img src="/sign_up_Illustration.webp" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>

                {/* Error message display */}
                {submitError && (
                    <div className="text-red-500 mb-4">{submitError}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="form-error text-xs mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex-col">
                        <label htmlFor="email">E-Mail</label>
                        <input
                            autoComplete="email"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <p className="form-error text-xs mt-1 hidden" ref={error}>User Already Exists</p>
                        {formik.touched.email && formik.errors.email && (
                            <p className="form-error text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="new-password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="form-error text-xs mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="cursor-pointer"
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <p className="pt-2">
                    Have an account? <Link to="/" style={{ textDecoration: "none" }}>Log In</Link>
                </p>
            </div>
        </div>
    );
}