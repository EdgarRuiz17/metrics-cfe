import GeneralInformation from "../models/GeneralInformation";
import Metrics from "../models/Metrics";
import { Request, Response } from "express";

export const getAllMetrics = async (_req: Request, res: Response) => {
   let response: any[];

   const metricsFound = await GeneralInformation.find({}).populate("metrics", "");

   response = metricsFound;
   if (!metricsFound) response = [];

   res.status(200).send(response);
};

export const createMetrics = async (req: Request, res: Response) => {
   console.log(req.body);
   const { metric_date, metrics } = req.body;

   try {
      const createdGeneralInfo = new GeneralInformation({
         metric_date,
      });

      const createdMetric = new Metrics({
         line: "HX",
         guard: "Y",
         ground: "Tanque",
         metrics: metrics.RHX,
      });
      createdMetric.validateSync();
      await createdMetric.save();
      createdGeneralInfo.metrics.push(createdMetric._id);

      const createdMetric2 = new Metrics({
         line: "Y",
         guard: "HX",
         ground: "Tanque",
         metrics: metrics.RY,
      });
      createdMetric2.validateSync();
      await createdMetric2.save();
      createdGeneralInfo.metrics.push(createdMetric2._id);

      const createdMetric3 = new Metrics({
         line: "HX",
         guard: "Tanque",
         ground: "Y",
         metrics: metrics.RHXY,
      });
      createdMetric3.validateSync();
      await createdMetric3.save();
      createdGeneralInfo.metrics.push(createdMetric3._id);

      await createdGeneralInfo.save();
      res.status(200).send({ message: "Metric created successfully" });
   } catch (error) {
      console.log({ error });
      res.status(401).send("Something went wrong");
   }
};
