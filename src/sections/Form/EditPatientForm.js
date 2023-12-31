import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Stack,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const steps = [
  {
    label: "Patients Details",
    description: "Enter Patient's Details here:",
    // fields: ['Patient Name (First, Last Name)', "Location", "Age", "Gender", "Phone", "Address"],
    fields: [
      "Patient ID",
      "Patient Name (First, Last Name)",
      "Location",
      "Age",
      "Gender",
      "Phone",
      "Address",
    ],
  },
  {
    label: "Prescription Related Details",
    description: "Enter Patient's Prescription Details here:",
    fields: ["Prescription", "Dose", "Visit Date", "Next Visit"],
  },
  {
    label: "Physician Details",
    description: "Enter Physician Details here:",
    fields: [
      "Physician ID",
      "Physician Name (First, Last Name)",
      "Physician Number",
      "Bill",
    ],
  },
];

export default function EditPatientForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const location = useLocation().state;

  React.useEffect(() => {
    const data = {
      "Patient Name (First, Last Name)": `${location?.firstName} ${location?.lastName}`,
      Location: location?.location,
      Age: location?.age,
      Gender: location?.gender,
      Phone: location?.phone,
      Address: location?.address,
      Prescription: location?.prescription,
      Dose: location?.dose,
      "Visit Date": location?.visitDate,
      "Next Visit": location?.nextVisit,
      "Physician ID": location?.physicianId,
      "Physician Name (First, Last Name)": `${location?.physicianFirstName} ${location?.physicianLastName}`,
      "Physician Number": location?.physicianNumber,
      Bill: location?.bill,
      "Patient ID": location?.patientId,
    };
    setFormData(data);
  }, [location]);

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    // Validate the fields before proceeding to the next step
    if (validateFields()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;

    // Check if the field name is 'field1' and the value contains only numbers
    if (
      fieldName === "Age" ||
      fieldName === "Phone" ||
      fieldName === "Physician Number"
    ) {
      if (fieldName === "Age" && Number.isNaN(Number(value))) {
        setErrors({
          ...errors,
          [fieldName]: `${fieldName} should contain only numbers.`,
        });
        return;
      }
      if (
        (fieldName === "Phone" || fieldName === "Physician Number") &&
        Number.isNaN(Number(value))
      ) {
        setErrors({
          ...errors,
          [fieldName]: `${fieldName} should contain only numbers.`,
        });

        return;
      }
    }
    // Handle invalid input for 'field1' (e.g., show an error message)
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    steps[activeStep].fields.forEach((fieldName) => {
      if (!formData[fieldName]) {
        newErrors[fieldName] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  const handleFinish = () => {
    const fieldMapping = {
      "Patient Name (First, Last Name)": ["firstName", "lastName"],
      "Physician Name (First, Last Name)": [
        "physicianFirstName",
        "physicianLastName",
      ],
      "Next Visit": ["nextVisit"],
      "Visit Date": ["visitDate"],
      "Patient ID": ["patientId"],
      "Physician ID": ["physicianId"],
      "Physician Number": ["physicianNumber"],
      Location: ["location"],
      Age: ["age"],
      Gender: ["gender"],
      Phone: ["phone"],
      Address: ["address"],
      Bill: ["bill"],
      Dose: ["dose"],
      Prescription: ["prescription"],
    };

    const renamedFormData = {};

    Object.keys(formData).forEach((oldField) => {
      if (fieldMapping[oldField]) {
        const [newField1, newField2] = fieldMapping[oldField];
        const fieldValue = formData[oldField];
        if (fieldValue) {
          const [firstName, lastName] = fieldValue.split(" ");
          renamedFormData[newField1] = firstName || "";
          renamedFormData[newField2] = lastName || "";
        }
      } else {
        renamedFormData[oldField] = formData[oldField];
      }
    });

    const apiEndpoint =
      `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_URL}update`;

    // Make a POST request to the API
    fetch(apiEndpoint, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(renamedFormData), // Convert data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setOpen(true);
        setSeverity("success");
        setMessage("Patient data updated successfully");
        setActiveStep(0);
        // Handle the API response data here if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
        setOpen(true);
        setSeverity("error");

        setMessage(error.message);
      });
  };

  const snackbar = () => {
    return isOpen ? (
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false);
        }}
        // message={message}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    ) : (
      <></>
    );
  };

  return (
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
      <Box>
        {isOpen ? snackbar() : <></>}
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: 5 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <form>
                  {/* <Container sx={{ display: "flex", flexDirection: ["column", "column", 'row'], justifyContent: "center", alignItems: "center" }}> */}

                  <Grid container spacing={2}>
                    {" "}
                    {/* Use Grid container */}
                    {step.fields.map((fieldName) => (
                      <Grid item xs={4} key={fieldName}>
                        {" "}
                        {/* Define the number of items in one line */}
                        <TextField
                          id={fieldName}
                          label={fieldName}
                          variant="outlined"
                          value={formData[fieldName] || ""}
                          onChange={(event) =>
                            handleInputChange(event, fieldName)
                          }
                          InputProps={{
                            // eslint-disable-next-line no-unneeded-ternary
                            readOnly:
                              fieldName === "Patient ID" ||
                              fieldName === "Physician ID"
                                ? true
                                : false,
                          }}
                          sx={{ mt: 2 }}
                        />
                        <Typography style={{ color: "red" }}>
                          {errors[fieldName]}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>

                  {/* </Container> */}
                </form>
                <Box sx={{ mb: 2 }}>
                  <Container>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </Container>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>{`Want to update these details?`}</Typography>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
            <Button
              onClick={handleFinish}
              sx={{ mt: 1, mr: 1 }}
              variant="contained"
            >
              Save
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
