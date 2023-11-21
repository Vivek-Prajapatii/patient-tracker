/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function createData(
  firstName,
  lastName,
  location,
  age,
  phone,
  gender,
  address,
  prescription,
  dose,
  physicianFirstName,
  physicianLastName,
  physicianNumber,
  bill,
  nextVisit,
  physicianId,
  patientId,
  visitDate
) {
  return {
    firstName,
    lastName,
    location,
    age,
    phone,
    gender,
    address,
    prescription,
    dose,
    physicianFirstName,
    physicianLastName,
    physicianNumber,
    bill,
    nextVisit,
    physicianId,
    patientId,
    visitDate,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Link to="/dashboard/editPatient_form" state={row}>
            <IconButton aria-label="expand row" size="small" title="Edit">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </TableCell>
        <TableCell>{row.patientId}</TableCell>
        <TableCell component="th" scope="row">
          {`${row.firstName} ${row.lastName}`}
        </TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, m: 5 }}>
              <Typography variant="h6" gutterBottom component="div">
                Prescription and Physician Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Prescription</TableCell>
                    <TableCell>Dose</TableCell>
                    <TableCell>Physician name</TableCell>
                    <TableCell>Physician number</TableCell>
                    <TableCell>Bill</TableCell>
                    <TableCell>Physician Id</TableCell>
                    <TableCell>Visit date</TableCell>
                    <TableCell>Next visit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.prescription}</TableCell>
                  <TableCell>{row.dose}</TableCell>
                  <TableCell>{`${row.physicianFirstName} ${row.physicianLastName}`}</TableCell>
                  <TableCell>{row.physicianNumber}</TableCell>
                  <TableCell>{row.bill}</TableCell>
                  <TableCell>{row.physicianId}</TableCell>
                  <TableCell>{row.visitDate}</TableCell>
                  <TableCell>{row.nextVisit}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData(
//     "first_name",
//     "last_name",
//     "Location",
//     "Age",
//     "Phone",
//     "Gender",
//     "Address",
//     "Prescription",
//     "Dose",
//     "Physician_first_name",
//     "Physician_last_name",
//     "Physician Number",
//     "Bill",
//     "Next Visit",
//     "Physician -ID",
//     "Patient- ID",
//     "Visit Date"
//   ),
//   createData(
//     "first_name",
//     "last_name",
//     "Location",
//     "Age",
//     "Phone",
//     "Gender",
//     "Address",
//     "Prescription",
//     "Dose",
//     "Physician_first_name",
//     "Physician_last_name",
//     "Physician Number",
//     "Bill",
//     "Next Visit",
//     "Physician -ID",
//     "Patient- ID",
//     "Visit Date"
//   ),
//   createData(
//     "first_name",
//     "last_name",
//     "Location",
//     "Age",
//     "Phone",
//     "Gender",
//     "Address",
//     "Prescription",
//     "Dose",
//     "Physician_first_name",
//     "Physician_last_name",
//     "7894561230",
//     "Bill",
//     "Next Visit",
//     "Physician -ID",
//     "Patient- ID",
//     "Visit Date"
//   ),
// ];

export default function DataTable({ searchQuery, rows }) {
  console.log(rows);  
  const filteredPatients = rows.filter((patient) => {
    const {
      firstName,
      lastName,
      location,
      age,
      phone,
      gender,
      address,
      prescription,
      dose,
      physicianFirstName,
      physicianLastName,
      physicianNumber,
      bill,
      nextVisit,
      physicianId,
      patientId,
      visitDate,
    } = patient;
    const lowerCaseQuery = String(searchQuery).toLowerCase();

    return (
      String(firstName).toLowerCase().includes(lowerCaseQuery) ||
      String(lastName).toLowerCase().includes(lowerCaseQuery) ||
      String(location).toLowerCase().includes(lowerCaseQuery) ||
      String(age).toLowerCase().includes(lowerCaseQuery) ||
      String(phone).toLowerCase().includes(lowerCaseQuery) ||
      String(gender).toLowerCase().includes(lowerCaseQuery) ||
      String(address).toLowerCase().includes(lowerCaseQuery) ||
      String(prescription).toLowerCase().includes(lowerCaseQuery) ||
      String(dose).toLowerCase().includes(lowerCaseQuery) ||
      String(physicianFirstName).toLowerCase().includes(lowerCaseQuery) ||
      String(physicianLastName).toLowerCase().includes(lowerCaseQuery) ||
      String(physicianNumber).toLowerCase().includes(lowerCaseQuery) ||
      String(bill).toLowerCase().includes(lowerCaseQuery) ||
      String(nextVisit).toLowerCase().includes(lowerCaseQuery) ||
      String(physicianId).toLowerCase().includes(lowerCaseQuery) ||
      String(patientId).toLowerCase().includes(lowerCaseQuery) ||
      String(visitDate).toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Patient Id</TableCell>

            <TableCell>Patient name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
