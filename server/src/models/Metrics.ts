import { Schema, model } from "mongoose";

interface MetricsInterface {
   line: String;
   guard: String;
   ground: String;
   metrics: MedidasInterface;
}

interface MedidasInterface {
   half: number;
   one: number;
   two: number;
   three: number;
   four: number;
   five: number;
   six: number;
   seven: number;
   eight: number;
   nine: number;
   ten: number;
}

const metricsSchema = new Schema({
   line: { type: String, required: true },
   guard: { type: String, required: true },
   ground: { type: String, required: true },
   metrics: { type: Object, required: true },
});

export default model<MetricsInterface>("Metrics", metricsSchema);
