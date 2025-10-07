const express = require('express');
const router=express.Router();

//Now importing the controlllers


//Profile controllers import

const {
    addNews,
    getAllNews,
}=require('../controllers/News');




/**************************************************************************************************************************************** */

/* News Routes */

/************************************************************************************************************ */

router.post("/addNews",addNews);
router.get("/getAllNews",getAllNews);


module.exports=router;

