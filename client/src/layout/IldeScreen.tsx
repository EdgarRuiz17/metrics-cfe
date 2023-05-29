import { Box, Typography } from "@mui/material";

export const IdleScreen = () => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 50,
            flexDirection: "column",
         }}
      >
         <Box
            component={"img"}
            src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Logo_neutral_de_la_Comisi%C3%B3n_Federal_de_Electricidad.svg"
            width={200}
         />
         <Typography sx={{ p: 2 }} fontWeight="700">
            Bienvenido al sistema de mediciones.
         </Typography>
         <Typography sx={{ p: 2 }} fontWeight="500">
            Favor de navegar con el menu de la parte izquierda.
         </Typography>
      </Box>
   );
};
