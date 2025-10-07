const express = require('express');
const router=express.Router();

//Now importing the controlllers


const {
    updateCurrPrice,
    updatePortfolioAmt
}=require('../controllers/PriceStock');


//Middlewares import
const {
    auth,
}=require('../middlewares/auth');



/**************************************************************************************************************************************** */

/* Profile Routes */

/************************************************************************************************************ */

router.post("/updateCurrPrice",updateCurrPrice);
router.post("/updatePortfolioAmt",updatePortfolioAmt);


module.exports=router;

