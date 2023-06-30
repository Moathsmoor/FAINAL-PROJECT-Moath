import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conection = await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected To Database");
  } catch (error) {
    console.log(`Error: ${error.mesdage}`);
    process.exit(1);
  }
};
export default connectDatabase;
