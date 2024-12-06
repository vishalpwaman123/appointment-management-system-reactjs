import React from "react";
import "./SignIn.css";
import AuthenticateService from "../../services/AuthenticateService";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const authService = new AuthenticateService();

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

function SignIn() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snachbarMessage, setSnackbarMessage] = React.useState("");

  const onSubmit = (value, { resetForm }) => {
    console.log(value);
    let data = {
      email: value.email,
      password: value.password,
    };

    authService
      .SignIn(data)
      .then((res) => {
        console.log(res.data);
        setOpenSnackbar(true);
        setSnackbarMessage(res.data.message);
        resetForm({
          values: initialValues,
        });
        if (res.data.isSuccess && res.data.data) {
          //CUSTOMER
          Object.entries({
            "C-USERID": res.data.data.id,
            "C-EMAIL": res.data.data.email,
            "C-TOKEN": res.data.token,
          }).forEach(([key, value]) => localStorage.setItem(key, value));
          window.location = "/UserDashboard";
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenSnackbar(true);
        setSnackbarMessage(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="d-flex justify-content-end align-items-start w-100">
      <div className="w-25 p-5 bg-light" id="singin-container">
        <div id="header" className="d-flex align-items-center flex-column mb-5">
          <div id="main-header" className="h4 text-danger">
            Appointment
          </div>
          <div id="sub-header" className="h5 text-muted">
            LogIn
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error"
                  />
                </div>
                <button
                  className="btn btn-primary w-100 mt-4"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  LogIn
                </button>
              </Form>
            );
          }}
        </Formik>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snachbarMessage}
          action={action}
        />
      </div>
    </div>
  );
}

export default SignIn;
