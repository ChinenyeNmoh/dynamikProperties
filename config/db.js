import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {

    //strictQuery  allows you to enable or disable strict mode for queries only the fields in the schema are saved in the db.
    mongoose.set("strictQuery", true);

    if(connected) {
        console.log("Already connected to the database");
        return;
    }

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        connected = true;

    }catch(err){
        console.error("Error connecting to the database", err.message);
        process.exit(1);
    }
}

export default connectDB;
