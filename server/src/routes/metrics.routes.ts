import { createMetrics, getAllMetrics } from "../controllers/metricsController";
import { Router } from "express";
const router = Router();

router.get("/", getAllMetrics).post("/add", createMetrics).delete("/delete/:programationId");

export default router;
