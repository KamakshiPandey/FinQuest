const mongoose = require('mongoose');
require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("Connection was successfull"))
    .catch((error)=>{
        console.log("Database connection was unsuccesffull");
        console.error(error);
    })
}