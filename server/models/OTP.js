const mongoose = require('mongoose');
const { mailSender } = require('../utils/MailSender');

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    },
});

// function to send verification email
async function sendVerificationEmail(email,otp){
    try{
        const mailresponse=mailSender(email,"Verfication Email for StockWave ",otp);
        console.log("Email sent successfully");
    }
    catch(error){
        console.log("Error occured while sending email ",error);
    }
}
// pre middleware to call verfication function :before saving
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",otpSchema);