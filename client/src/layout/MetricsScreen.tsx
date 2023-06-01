import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getMetrics } from "../lib/backendClient";
import { MetricsInfo } from "../components/MetricsComponents/MetricsDashboard";
import { formatDate } from "../utils/preprocess";
import { Layout } from "./Layout";

export const MetricsScreen = () => {
   const [metrics, setMetrics] = useState([]);
   const [selectedMetric, setSelectedMetric] = useState(null);
   const [selectedDate, setSelectedDate] = useState("");
   const [createNew, setCreateNew] = useState(false);

   const changeSelectedMetric = (event) => {
      const { target } = event;
      setSelectedDate(target.value);
   };

   useEffect(() => {
      const fetchMetrics = async () => {
         const metricsFound = await getMetrics();
         setMetrics(metricsFound.data);
      };
      fetchMetrics();
   }, [setMetrics, createNew]);

   return (
      <Box sx={{ flexGrow: 1 }}>
         {!createNew ? (
            <>
               <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 2 }}>
                     <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Seleccionar fecha</InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={selectedDate}
                           label="Seleccionar fecha"
                           onChange={changeSelectedMetric}
                        >
                           {metrics.map((metric) => (
                              <MenuItem
                                 value={formatDate(metric.metric_date)}
                                 onClick={() => {
                                    setSelectedMetric(metric);
                                 }}
                              >
                                 {formatDate(metric.metric_date)}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                     <Button
                        variant="contained"
                        fullWidth
                        sx={{ minHeight: "100%" }}
                        onClick={() => setCreateNew(true)}
                     >
                        Crear nueva
                     </Button>
                  </Box>
               </Box>
               {selectedMetric ? <MetricsInfo metric={selectedMetric} /> : null}
            </>
         ) : (
            <Box>
               <Box sx={{ display: "flex" }}>
                  <Button variant="contained" onClick={() => setCreateNew(false)}>
                     Volver a lista
                  </Button>
               </Box>
               <Layout setCreateNew={setCreateNew} createNew={createNew} />
            </Box>
         )}
      </Box>
   );
};
