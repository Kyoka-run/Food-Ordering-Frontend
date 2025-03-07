import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./Login";
import RegistrationForm from "./Register";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordRequest from "./ResetPasswordRequest";

const Auth = ({ handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isOpen = 
    location.pathname === "/account/register" ||
    location.pathname === "/account/login" ||
    location.pathname === "/account/reset-password-request" ||
    location.pathname === "/account/reset-password";
  
  const isResetPasswordFlow = 
    location.pathname === "/account/reset-password-request" || 
    location.pathname === "/account/reset-password";

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      data-testid="auth-modal"
    >
      <Box 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-4 rounded"
        data-testid="auth-container"
      >
        {location.pathname === "/account/register" ? (
          <RegistrationForm />
        ) : location.pathname === "/account/login" ? (
          <LoginForm />
        ) : location.pathname === "/account/reset-password" ? (
          <ResetPasswordForm />
        ) : (
          <ResetPasswordRequest />
        )}
        
        <div className="flex justify-center mt-5">
          {isResetPasswordFlow ? (
            <Button 
              onClick={() => navigate("/account/login")}
              data-testid="back-to-login-button"
            >
              Go Back To Login
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/account/reset-password-request")}
              data-testid="forgot-password-button"
            >
              Forgot Password
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default Auth;