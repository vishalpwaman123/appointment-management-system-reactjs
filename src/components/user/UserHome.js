import React, { forwardRef } from "react";
import CustomerServices from "../../services/CustomerServices";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const customerServices = new CustomerServices();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserHome = forwardRef((props, ref) => {
  const [rows, setRows] = React.useState([]);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snachbarMessage, setSnackbarMessage] = React.useState("");

  const GetPostByUserId = () => {
    let userId = Number(localStorage.getItem("C-USERID"));
    customerServices
      .GetPostByUserId(userId)
      .then((res) => {
        console.log(res);
        setRows(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdateSubmit = (value, { resetForm }) => {
    console.log(value);
    const formData = new FormData();
    formData.append("Id", value.id);
    formData.append("Title", value.title);
    formData.append("File", value.file);
    debugger;
    customerServices
      .UpdatePost(formData)
      .then((res) => {
        console.log(res.data);
        setOpenSnackbar(true);
        setSnackbarMessage(res.data.message);
        GetPostByUserId();
      })
      .catch((err) => {
        console.log(err);
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
    <div>
      <div className="d-flex flex-wrap">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Date & time</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(function (row, index) {
                console.log(row);
                return (
                  <React.Fragment>
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.date + " " + row.time}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <button className="btn btn-dark">Cancel</button>
                      </StyledTableCell>
                    </StyledTableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

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
});

export default UserHome;
