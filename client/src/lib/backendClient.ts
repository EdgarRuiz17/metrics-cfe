import axios from "axios";

const baseURL = "http://localhost:5000";

const METRICS = "/metrics";
const ADD = "/add";

export const createNewMetric = async (metrics) => {
   const payload = {
      metric_date: new Date(),
      metrics,
   };

   return await axios.post(`${baseURL}${METRICS}${ADD}`, payload);
};

export const getMetrics = async () => {
   return await axios.get(`${baseURL}${METRICS}/`);
};
