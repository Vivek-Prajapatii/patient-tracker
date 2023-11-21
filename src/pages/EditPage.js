/* eslint-disable camelcase */
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Stack,
  Popover,
  MenuItem,
  Container,
  Typography,
  TextField,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import DataTable from "../sections/DataTable/DataTable";

export default function EditPage() {
  const [open, setOpen] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_URL}`;

    // Make a POST request to the API
    fetch(apiEndpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the API response data here if needed
        setRows(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
      });
  }, []);

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Edit Patients | Bhumio </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Edit Patients
          </Typography>
        </Stack>
        <TextField
          label="Search Patients"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "16px" }}
        />
        <DataTable searchQuery={searchQuery} rows={rows} />
      </Container>
    </>
  );
}
