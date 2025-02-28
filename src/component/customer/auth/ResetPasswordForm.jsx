import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Container, CssBaseline } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/actions/authActions";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmedPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function ResetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const initialValues = {
    password: "",
    confirmedPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      if (!token) {
        setStatus({ error: "Reset token is missing. Please request a new password reset." });
        return;
      }

      const data = { password: values.password, token };
      await dispatch(resetPassword({ navigate, data }));
    } catch (error) {
      setStatus({ error: "Password reset failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5" gutterBottom align="center">
        Reset Password
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* New Password Input */}
            <div className="mb-4">
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="New Password"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <Field name="confirmedPassword">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Confirm Password"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ 
                padding: ".8rem 0rem",
                '&:disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)'
                }
              }}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>

            {/* Back to Login Button */}
            <Button
              onClick={() => navigate("/account/login")}
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ResetPasswordForm;