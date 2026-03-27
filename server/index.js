import express from "express" ;
import dotenv from "dotenv" ;
import connectDb from "./utils/connectDb.js";

dotenv.config() ;


const app = express() ;
const PORT  = process.env.PORT ;        

app.get("/", (req, res)=>{
    res.json({
        'message' : "hello world ai notes generator"
    });
})

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`) ; 
    connectDb()
}) ;