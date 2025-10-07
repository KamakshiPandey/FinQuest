const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Authentication controllers import

const {
    sendOTP,
    signUp,
    login,
    changePassword,
}=require('../controllers/Auth');

//Reset password controllers import


const {
    resetPassword,
    resetPasswordToken
}=require('../controllers/Reset');




//Middlewares import
const {
    auth
}=require('../middlewares/auth');




/**************************************************************************************************************************************** */

/* Authentication Routes */

/************************************************************************************************************ */

router.post("/sendOTP",sendOTP);
router.post("/signUp",signUp);
router.post("/login",login);
router.post("/changePassword",auth,changePassword);

/**************************************************************************************************************************************** */

/* Reset Password Routes */

/************************************************************************************************************ */



router.post("/resetPassword",resetPassword);
router.post("/resetPasswordToken",resetPasswordToken);

module.exports=router;



