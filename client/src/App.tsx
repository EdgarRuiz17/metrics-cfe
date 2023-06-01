import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error404 from "./layout/Error404";
import MiniDrawer from "./components/Drawer";
import { IdleScreen } from "./layout/IldeScreen";
import { theme } from "./theme/ThemeProvider";
import { ThemeProvider } from "@mui/material";
import { MetricsScreen } from "./layout/MetricsScreen";

function App() {
   return (
      <ThemeProvider theme={theme}>
         <InitialRoutes />
      </ThemeProvider>
   );
}

//routes
const InitialRoutes = () => {
   return (
      <div>
         <Router>
            <Routes>
               <Route path="*" element={<Error404 />} />
               <Route path="/" element={<MiniDrawer />}>
                  <Route path="" element={<IdleScreen />} />
                  <Route path="list" element={<MetricsScreen />} />
               </Route>
            </Routes>
         </Router>
      </div>
   );
};

export default App;
