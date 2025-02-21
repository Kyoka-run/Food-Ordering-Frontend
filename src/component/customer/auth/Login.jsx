import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";

const initialValues = {
  username: "",
  password: ""
};

// Form validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    try {
      dispatch(loginUser({
        data: values,
        navigate: navigate
      }));
    } catch (error) {
      setStatus({ error: "Login failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>

        {/* Login Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {status?.error && (
                <Alert severity="error" className="mb-4">
                  {status.error}
                </Alert>
              )}

              {/* Username Input */}
              <div className="mb-4">
                <Field name="username">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Username"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      autoComplete="username"
                    />
                  )}
                </Field>
              </div>
              
              {/* Password Input */}
              <div className="mb-4">
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Password"
                      type="password"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      autoComplete="current-password"
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
                  mt: 2, 
                  padding: "1rem",
                  '&:disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* Register Link */}
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Button 
                  onClick={() => navigate("/account/register")}
                  color="primary"
                >
                  Register
                </Button>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;