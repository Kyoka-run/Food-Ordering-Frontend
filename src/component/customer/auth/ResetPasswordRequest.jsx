import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  Alert,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAction } from "../../../redux/actions/authActions";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(resetPasswordRequestAction(values.email));
      setStatus({ success: "Password reset link has been sent to your email" });
    } catch (error) {
      setStatus({ error: "Failed to send reset password link. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="w-full space-y-4">
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
                        autoFocus
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
                    padding: "1rem",
                    '&:disabled': {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      color: 'rgba(0, 0, 0, 0.26)'
                    }
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Password Link"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)' 
        }}
        open={auth.isLoading}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="body1" color="white">
            Sending reset link...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default ResetPasswordRequest;