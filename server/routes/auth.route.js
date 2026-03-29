import express from "express"

const authRouter = express.Router() ;

authRouter.post("/google", googleAuth);

export default authRouter ; 

