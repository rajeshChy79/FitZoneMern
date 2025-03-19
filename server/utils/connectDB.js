import mongoose from "mongoose";

const connectDB = (MONGODB_URI) => {
    mongoose.connect(MONGODB_URI).then(() => console.log("connected mongodb successfully")).catch((err) => console.log(err || "mongodb not connected") );
}

export default connectDB;