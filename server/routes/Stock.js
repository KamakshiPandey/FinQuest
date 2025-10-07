const express=require('express');
const router=express.Router();

const {buyStock,sellStock}=require('../controllers/Stock');

const{auth}=require('../middlewares/auth');

router.post('/buyStock',auth,buyStock);
router.post('/sellStock',auth,sellStock);

module.exports=router;