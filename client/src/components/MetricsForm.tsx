import { Box, Button, Grid, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

interface MetricsFormProps {
   step: number;
   setMetrics: Function;
   setMetricsCompleted: Function;
   metrics2: any;
   metricsCompleted: any;
}

const metrics = [
   { name: "1/2", field: "half" },
   { name: "1", field: "one" },
   { name: "2", field: "two" },
   { name: "3", field: "three" },
   { name: "4", field: "four" },
   { name: "5", field: "five" },
   { name: "6", field: "six" },
   { name: "7", field: "seven" },
   { name: "8", field: "eight" },
   { name: "9", field: "nine" },
   { name: "10", field: "ten" },
];

export const MetricsForm = ({
   step,
   setMetricsCompleted,
   setMetrics,
   metrics2,
   metricsCompleted,
}: MetricsFormProps) => {
   const setMetricsCaptured = (values, actions) => {
      console.log(values);
      if (step === 0) {
         setMetrics({ ...metrics2, RHX: values });
         setMetricsCompleted({ ...metricsCompleted, RHX: true });
      }
      if (step === 1) {
         setMetrics({ ...metrics2, RY: values });
         setMetricsCompleted({ ...metricsCompleted, RY: true });
      }
      if (step === 2) {
         setMetrics({ ...metrics2, RHXY: values });
         setMetricsCompleted({ ...metricsCompleted, RHXY: true });
      }
      actions.resetForm();
      return;
   };

   return (
      <Box sx={{ flexGrow: 1, bgcolor: "whitesmoke", borderRadius: 2, boxShadow: 2, p: 3 }}>
         <Formik
            initialValues={{
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
            }}
            onSubmit={setMetricsCaptured}
         >
            {({ isSubmitting }) => (
               <Form>
                  <Typography variant="h5" align="center">
                     Lectura
                  </Typography>
                  <Grid container>
                     <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2, minWidth: "100%" }}>
                        <Box sx={{ display: "flex" }}>
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" align="center">
                                 Tiempo de la medición en min.
                              </Typography>
                           </Box>
                           <Box sx={{ flex: 1 }} />
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" align="center">
                                 Medida
                              </Typography>
                           </Box>
                        </Box>
                        {metrics.map((metric) => (
                           <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <Box sx={{ flex: 1 }}>
                                 <Typography variant="h6" align="center">
                                    {metric.name}
                                 </Typography>
                              </Box>
                              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                 <TrendingFlatIcon />
                              </Box>
                              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                 <Field type="number" name={metric.field} />
                                 <ErrorMessage name={metric.field} component="div" />
                              </Box>
                           </Box>
                        ))}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 12, mt: 2 }}>
                           <Button type="submit" disabled={isSubmitting} variant="outlined">
                              Guardar
                           </Button>
                        </Box>
                     </Box>
                  </Grid>
               </Form>
            )}
         </Formik>
      </Box>
   );
};
