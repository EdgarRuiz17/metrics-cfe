import { Schema, model, Types } from "mongoose";

interface GeneralInterface {
   metric_date: Date;
   metrics: Types.ObjectId[];
}

const generalInformationSchema = new Schema({
   metric_date: { type: Date, required: true },
   metrics: [{ type: Types.ObjectId, ref: "Metrics" }],
});

export default model<GeneralInterface>("GeneralInformation", generalInformationSchema);
