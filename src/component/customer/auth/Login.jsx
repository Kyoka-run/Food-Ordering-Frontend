import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const loading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser({
      data: values,
      navigate: navigate
    }));
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs" data-testid="login-container">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5" data-testid="form-title">
          Login
        </Typography>

        {error && (
          <Typography color="error" variant="body2" className="mt-2" data-testid="error-message">
            {error}
          </Typography>
        )}

        {/* Login Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4" data-testid="login-form">
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
                      inputProps={{ "data-testid": "username-input" }}
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
                      inputProps={{ "data-testid": "password-input" }}
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
                disabled={isSubmitting || loading}
                sx={{ 
                  mt: 2, 
                  padding: "1rem"
                }}
                data-testid="login-button"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* Register Link */}
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Button 
                  onClick={() => navigate("/account/register")}
                  color="primary"
                  data-testid="register-link"
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