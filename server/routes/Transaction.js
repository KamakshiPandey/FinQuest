const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Profile controllers import

const {
    deleteTransaction
}=require('../controllers/Transaction');


//Middlewares import
const {
    auth,
}=require('../middlewares/auth');



/**************************************************************************************************************************************** */

/* Profile Routes */

/************************************************************************************************************ */

router.post("/deleteTransaction",auth,deleteTransaction);


module.exports=router;

