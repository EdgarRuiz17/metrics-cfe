import mongoose from "mongoose";

export const connectToDB = async () => {
   console.log(process.env.MONGO_USER);
   try {
      const db = await mongoose.connect(
         `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cfe-db.7mvh1m5.mongodb.net/?retryWrites=true&w=majority`
      );
      console.log("DB connected to", db.connection.name);
   } catch (error) {
      console.log(error);
   }
};
