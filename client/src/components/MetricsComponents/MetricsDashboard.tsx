import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { formatDate } from "../../utils/preprocess";

const steps = ["RHX", "RY", "RHX-Y"];

export const MetricsInfo = ({ metric }) => {
   return (
      <Box sx={{ mt: 2 }}>
         <Typography variant="h5" align="center">
            Mediciones
         </Typography>
         <Grid container sx={{ mt: 2, rowGap: 2 }}>
            <Grid xs={12}>
               <Box sx={{ bgcolor: "whitesmoke", borderRadius: 2, boxShadow: 2, p: 2 }}>
                  <Grid container>
                     <Grid xs={6}>Mediciónes del día: </Grid>
                     <Grid xs={6}>{formatDate(metric.metric_date)}</Grid>
                  </Grid>
               </Box>
            </Grid>
            <Grid xs={12}>
               <Box sx={{ bgcolor: "whitesmoke", borderRadius: 2, boxShadow: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
                     {metric.metrics.map((print, i) => {
                        const printLines = [
                           { title: "Línea", value: print.line },
                           { title: "Guarda", value: print.guard },
                           { title: "Tierra", value: print.ground },
                        ];
                        const metrics = [
                           { name: "1/2", field: print.metrics.half },
                           { name: "1", field: print.metrics.one },
                           { name: "2", field: print.metrics.two },
                           { name: "3", field: print.metrics.three },
                           { name: "4", field: print.metrics.four },
                           { name: "5", field: print.metrics.five },
                           { name: "6", field: print.metrics.six },
                           { name: "7", field: print.metrics.seven },
                           { name: "8", field: print.metrics.eight },
                           { name: "9", field: print.metrics.nine },
                           { name: "10", field: print.metrics.ten },
                        ];
                        return (
                           <Box sx={{ bgcolor: "white" }}>
                              <Box>
                                 <Typography fontWeight={600} align="center">
                                    {steps[i]}
                                 </Typography>
                              </Box>
                              <Divider />
                              <Box sx={{ display: "flex" }}>
                                 <Box sx={{ flex: 1, p: 2 }}>
                                    {printLines.map((p) => (
                                       <Box sx={{ display: "flex", flex: 1, p: 1 }}>
                                          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                             {p.title}
                                          </Box>
                                          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                             <TrendingFlatIcon />
                                          </Box>
                                          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                             {p.value}
                                          </Box>
                                       </Box>
                                    ))}
                                 </Box>
                                 <Divider orientation="vertical" flexItem />
                                 <Box sx={{ flex: 1, p: 2 }}>
                                    <Box sx={{ display: "flex", py: 1 }}>
                                       <Box sx={{ flex: 1 }}>
                                          <Typography variant="body1" align="center" fontWeight={600}>
                                             Tiempo de la medición en min.
                                          </Typography>
                                       </Box>
                                       <Box sx={{ flex: 1 }} />
                                       <Box sx={{ flex: 1 }}>
                                          <Typography variant="body1" align="center" fontWeight={600}>
                                             Medida
                                          </Typography>
                                       </Box>
                                    </Box>
                                    {metrics.map((metric) => (
                                       <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <Box sx={{ flex: 1 }}>
                                             <Typography variant="body1" align="center">
                                                {metric.name}
                                             </Typography>
                                          </Box>
                                          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                             <TrendingFlatIcon />
                                          </Box>
                                          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                             <Typography variant="body1" align="center">
                                                {metric.field}
                                             </Typography>
                                          </Box>
                                       </Box>
                                    ))}
                                 </Box>
                              </Box>
                           </Box>
                        );
                     })}
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
