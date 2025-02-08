import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full Name can only contain letters and spaces"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: Yup.string().required("Role is required"),
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(registerUser({
        userData: values,
        navigate,
        setLoader: setSubmitting,
        toast: {
          success: (msg) => setStatus({ success: msg }),
          error: (msg) => setStatus({ error: msg })
        }
      }));
    } catch (error) {
      setStatus({ error: "Registration failed. Please try again." });
      console.error('Error during registration:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5" gutterBottom>
          Register
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, status }) => (
            <Form className="space-y-4">
              {status?.error && (
                <Alert severity="error" className="mb-4">
                  {status.error}
                </Alert>
              )}
              {status?.success && (
                <Alert severity="success" className="mb-4">
                  {status.success}
                </Alert>
              )}

              {/* Full Name Input */}
              <div className="mb-4">
                <Field name="fullName">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Full Name"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      autoComplete="email"
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
                      type="password"
                      label="Password"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </div>

              {/* Role Selection */}
              <div className="mb-4">
                <Field name="role">
                  {({ field, meta }) => (
                    <FormControl 
                      fullWidth 
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        {...field}
                        label="Role"
                      >
                        <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                        <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
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
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              {/* Login Link */}
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?{" "}
                <Button 
                  onClick={() => navigate("/account/login")}
                  color="primary"
                >
                  Login
                </Button>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Registration;