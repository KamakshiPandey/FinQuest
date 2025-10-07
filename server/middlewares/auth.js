const jwt=require("jsonwebtoken");
require("dotenv").config();

//auth middle ware 

exports.auth=async(req,res,next)=>{
    try{
        //extracting token from bearer || cookie || body 
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log("Token",token);
        if(!token){
            return res.status(500).json({
                success:false,
                message:"TOKEN NOT FOUND",
            })
        }
        
        try{
            //decoding the toekn 
            const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedtoken
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in token",
                error
            })
        }


        next();
    }
    catch(error){
        console.log("Error occured in authentication middleware",error);
        return res.status(500).json({
            success:false,
            message:"Authentication failed",
        })
    }
}

