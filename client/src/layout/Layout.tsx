import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AlertColor, Button, Typography } from "@mui/material";
import { Indications, MetricsForm } from "../components";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import React from "react";
import { createNewUser } from "../lib/backendClient";
import AlertSnackBar from "../components/AlertSnackbar";

const steps = ["RHX", "RY", "RHX-Y"];

export const Layout = () => {
   const [activeStep, setActiveStep] = useState(0);
   const [skipped, setSkipped] = useState(new Set<number>());
   const [messageSnackBar, setMessageSnackBar] = React.useState("");
   const [severitySnackBar, setSeveritySnackBar] = React.useState<AlertColor>("error");
   const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
   const [metricsCompleted, setMetricsCompleted] = useState({
      RHX: false,
      RY: false,
      RHXY: false,
   });
   const [metrics, setMetrics] = useState({
      RHX: {
         half: 0,
         one: 0,
         two: 0,
         three: 0,
         four: 0,
         five: 0,
         six: 0,
         seven: 0,
         eight: 0,
         nine: 0,
         ten: 0,
      },
      RY: {
         half: 0,
         one: 0,
         two: 0,
         three: 0,
         four: 0,
         five: 0,
         six: 0,
         seven: 0,
         eight: 0,
         nine: 0,
         ten: 0,
      },
      RHXY: {
         half: 0,
         one: 0,
         two: 0,
         three: 0,
         four: 0,
         five: 0,
         six: 0,
         seven: 0,
         eight: 0,
         nine: 0,
         ten: 0,
      },
   });

   const isStepOptional = (step: number) => {
      return step === 1;
   };

   const isStepSkipped = (step: number) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   const createNewMetrics = async () => {
      try {
         await createNewUser(metrics);
         setMessageSnackBar("Medidas almacenadas correctamente");
         setSeveritySnackBar("success");
         setOpenSnackBar(true);
      } catch (error) {
         console.log(error);
         setMessageSnackBar("Hubo un problema, favor de volver a intentar");
         setSeveritySnackBar("error");
         setOpenSnackBar(true);
      }
   };

   return (
      <Box sx={{ flexGrow: 1 }}>
         <Typography variant="h5" align="center">
            Agregar nuevas mediciones
         </Typography>
         <Box sx={{ width: "100%", mt: 2 }}>
            <Stepper activeStep={activeStep}>
               {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                     optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
                  if (isStepSkipped(index)) {
                     stepProps.completed = false;
                  }
                  return (
                     <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                     </Step>
                  );
               })}
            </Stepper>
            {activeStep === steps.length ? (
               <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                     <Box sx={{ flex: "1 1 auto" }} />
                     <Button onClick={handleReset}>Reset</Button>
                  </Box>
               </React.Fragment>
            ) : (
               <>
                  <Grid container spacing={2} sx={{ p: 4 }}>
                     <Grid item xs={12} md={6}>
                        {activeStep === 0 ? (
                           <Indications title="RHX" line="HX" guard="Y" land="Tanque" />
                        ) : activeStep === 1 ? (
                           <Indications title="Ry" line="Y" guard="HX" land="Tanque" />
                        ) : activeStep === 2 ? (
                           <Indications title="RHX-Y" line="HX" guard="Tanque" land="Y" />
                        ) : null}
                     </Grid>
                     <Grid item xs={12} md={6}>
                        {activeStep === 0 ? (
                           <MetricsForm
                              step={activeStep}
                              setMetrics={setMetrics}
                              metrics2={metrics}
                              setMetricsCompleted={setMetricsCompleted}
                              metricsCompleted={metricsCompleted}
                           />
                        ) : activeStep === 1 ? (
                           <MetricsForm
                              step={activeStep}
                              setMetrics={setMetrics}
                              metrics2={metrics}
                              setMetricsCompleted={setMetricsCompleted}
                              metricsCompleted={metricsCompleted}
                           />
                        ) : activeStep === 2 ? (
                           <MetricsForm
                              step={activeStep}
                              setMetrics={setMetrics}
                              metrics2={metrics}
                              setMetricsCompleted={setMetricsCompleted}
                              metricsCompleted={metricsCompleted}
                           />
                        ) : null}
                     </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                     <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        variant="outlined"
                     >
                        Atras
                     </Button>
                     <Box sx={{ flex: "1 1 auto" }} />
                     {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} variant="outlined">
                           Saltar
                        </Button>
                     )}
                     {activeStep === 0 && metricsCompleted.RHX ? (
                        <Button onClick={handleNext} variant="outlined">
                           {activeStep === steps.length - 1 ? "Completar" : "Siguiente"}
                        </Button>
                     ) : activeStep === 1 && metricsCompleted.RY ? (
                        <Button onClick={handleNext} variant="outlined">
                           {activeStep === steps.length - 1 ? "Completar" : "Siguiente"}
                        </Button>
                     ) : activeStep === 2 && metricsCompleted.RHXY ? (
                        <Button onClick={createNewMetrics} variant="outlined">
                           {activeStep === steps.length - 1 ? "Completar" : "Siguiente"}
                        </Button>
                     ) : (
                        "Favor de rellenar los datos"
                     )}
                  </Box>
               </>
            )}
         </Box>
         <AlertSnackBar
            open={openSnackBar}
            setOpen={setOpenSnackBar}
            message={messageSnackBar}
            severity={severitySnackBar}
         />
      </Box>
   );
};
