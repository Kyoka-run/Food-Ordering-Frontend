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
import { registerUser } from "../../../redux/actions/authActions";

const initialValues = {
  username: "",
  email: "",
  password: "",
  role: []
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Username must be at most 40 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers"),
  role: Yup.array()
    .min(1, "Please select at least one role")
    .required("Role is required"),
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
                  {({ field, meta, form }) => (
                    <FormControl 
                      fullWidth 
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        {...field}
                        label="Role"
                        multiple
                        value={field.value}
                        onChange={(e) => form.setFieldValue('role', e.target.value)}
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="owner">Restaurant Owner</MenuItem>
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