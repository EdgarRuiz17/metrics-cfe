import { Box, Typography } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
interface IndicationsProps {
   title: string;
   line: string;
   guard: string;
   land: string;
}

export const Indications = ({ title, line, guard, land }: IndicationsProps) => {
   const printLines = [
      { title: "Línea", value: line },
      { title: "Guarda", value: guard },
      { title: "Tierra", value: land },
   ];

   return (
      <Box
         sx={{
            bgcolor: "whitesmoke",
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
            display: "flex",
         }}
      >
         <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 2 }}>
            <Typography variant="body1" align="center" fontWeight={600}>
               {title}
            </Typography>
            {printLines.map((print) => (
               <Box sx={{ display: "flex", flex: 1 }}>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>{print.title}</Box>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                     <TrendingFlatIcon />
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>{print.value}</Box>
               </Box>
            ))}
         </Box>
      </Box>
   );
};
