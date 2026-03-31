import express from "express" ;
import dotenv from "dotenv" ;
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";

dotenv.config() ;


const app = express() ;

app.use(cors(
    {origin : "http://localhost:5173" , 
        credentials : true , 
        methods : ["GET" ,"POST"  , "PUT" , "DELETE" , "OPTIONS"]
    }
));
app.use(express.json())
app.use(cookieParser());

const PORT  = process.env.PORT ;        

app.get("/", (req, res)=>{
    res.json({
        'message' : "hello world ai notes generator"
    });
})

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`) ; 
    connectDb()
}) ;