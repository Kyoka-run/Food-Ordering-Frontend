import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationForm from "./Register";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./Login";
import ResetPasswordRequest from "./ResetPasswordRequest";
import { useSelector } from "react-redux";
import ResetPasswordForm from "./ResetPasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Auth = ({ handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const success = useSelector((state) => state.auth.success);
  const error = useSelector((state) => state.auth.error);
  const [openSnackBar,setOpenSnackBar] = useState(false);

useEffect(()=>{
  if(success || error) setOpenSnackBar(true)
}, [success, error])

const handleCloseSnackBar=()=>{
  setOpenSnackBar(false)
}

  return (
    <>
      <Modal
        open = {
          location.pathname === "/account/register" ||
          location.pathname === "/account/login" ||
          location.pathname === "/account/reset-password-request" ||
          location.pathname === "/account/reset-password"
        }
        onClose = {handleClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegistrationForm />
          ) : location.pathname === "/account/login" ? (
            <LoginForm />
          ) : location.pathname === "/account/reset-password" ? <ResetPasswordForm/>: (
            <ResetPasswordRequest />
          )}
          <div className="flex justify-center mt-5">
            {location.pathname === "/account/reset-password-request" || location.pathname === "/account/reset-password"  ? (
              <Button onClick={() => navigate("/account/login")}>
                Go Back To Login
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/account/reset-password-request")}
              >
                Forgot Pasword
              </Button>
            )}
            <Snackbar
              sx={{ zIndex: 50 }}
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleCloseSnackBar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity={error?"error":"success"} sx={{ width: "100%" }}>
                {success || error}
              </Alert>
            </Snackbar>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
