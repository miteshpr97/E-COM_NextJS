import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect("process.env.MONGODB_URI!");
        const connection = mongoose.connection;
        connection.on("connected",() =>{
            console.log("MongoDB connected succesfully");
            
        });

        connection.on("error", (err) =>{
            console.error("mongoDB connection failed", err);
            process.exit();
        })

    }catch(error){
        console.log("Error connecting to database", error);

    }
}