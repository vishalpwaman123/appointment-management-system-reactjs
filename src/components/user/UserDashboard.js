import React, { useRef } from "react";
import "./UserDashboard.css";
import CustomerServices from "../../services/CustomerServices";
import UserHome from "./UserHome";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  name: "",
  phone: "",
  address: "",
  date: "",
  time: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  date: Yup.date()
    .required("Appointment is required")
    .min(new Date(), "Date must be in the future"),
  time: Yup.string().required("Time is required"),
});

const customerServices = new CustomerServices();

export default function UserDashboard(props) {
  const [navItem, setNavItem] = React.useState("HOME");
  const [_searchKeyword, setSearchKeyword] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snachbarMessage, setSnackbarMessage] = React.useState("");

  const handleBody = () => {
    if (navItem.includes("HOME")) return <UserHome />;
    else handleLogout();
  };

  const handleLogout = () => {
    localStorage.removeItem("C-USERID");
    localStorage.removeItem("C-TOKEN");
    window.location = "/";
  };

  const onSubmit = (value, { resetForm }) => {
    console.log(value);

    customerServices
      .AddPost(value)
      .then((res) => {
        console.log(res.data);
        setModalShow(false);
        setOpenSnackbar(true);
        setSnackbarMessage(res.data.message);
        // GetPostByUserId();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Header = () => {
    return (
      <header className="header">
        <AppBar component="nav" className="position-static" id="Appbar">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", fontSize: 18 },
              }}
            >
              Appointment Management System
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                variant="text"
                onClick={() => {
                  handleLogout();
                }}
                sx={{ color: "#fff" }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </header>
    );
  };

  const Nav = () => {
    return (
      <nav className="nav">
        <ul>
          <lib>
            <button
              className="btn btn-outline-dark pr-4"
              onClick={() => {
                setModalShow(true);
              }}
            >
              <AddIcon /> New
            </button>
          </lib>
          <li className="mt-3">
            Today
            <ArrowForwardIosIcon style={{ marginLeft: 100, fontSize: 12 }} />
          </li>
        </ul>
      </nav>
    );
  };

  const SubBody = () => {
    return <main className="sub-body">{handleBody()}</main>;
  };

  return (
    <React.Fragment>
      <div className="app-container">
        {Header()}
        <div className="main-container">
          {Nav()}
          {SubBody()}
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-primary h5"
          >
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "black", fontSize: 18 }}
            >
              ADD APPOINTMENT
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div>
                    <div>
                      <div className="w-100">
                        <div className="d-flex">
                          <div className="w-50 mb-3 mr-2">
                            <label htmlFor="title" className="form-label">
                              Name *
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                            />
                            <ErrorMessage
                              name="name"
                              component="span"
                              className="error"
                            />
                          </div>
                          <div className="mb-3 w-50">
                            <label htmlFor="phone" className="form-label">
                              Phone *
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                            />
                            <ErrorMessage
                              name="phone"
                              component="span"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="w-50 mb-3 mr-2">
                            <label htmlFor="date" className="form-label">
                              Appointment Date *
                            </label>
                            <Field
                              type="date"
                              className="form-control"
                              id="date"
                              name="date"
                            />
                            <ErrorMessage
                              name="date"
                              component="span"
                              className="error"
                            />
                          </div>
                          <div className="mb-3 w-50">
                            <label htmlFor="time" className="form-label">
                              Appointment Time *
                            </label>
                            <Field
                              type="time"
                              className="form-control"
                              id="time"
                              name="time"
                            />
                            <ErrorMessage
                              name="time"
                              component="span"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">
                            Address *
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                          />
                          <ErrorMessage
                            name="address"
                            component="span"
                            className="error"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary float-right mt-2"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Save
                    </button>
                    <Button type="button" onClick={() => setModalShow(false)}>
                      Close
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
