const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Profile controllers import

const {
    updateProfile,
    updateDisplayPicture,
}=require('../controllers/Profile');


//Middlewares import
const {
    auth,
}=require('../middlewares/auth');



/**************************************************************************************************************************************** */

/* Profile Routes */

/************************************************************************************************************ */

router.post("/updateProfile",auth,updateProfile);
router.post("/updateDisplayPicture",auth,updateDisplayPicture);


module.exports=router;

