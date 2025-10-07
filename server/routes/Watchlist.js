const express=require('express');
const router=express.Router();

const {addToWatchlist,removeFromWatchlist}=require('../controllers/Watchlist');

const{auth}=require('../middlewares/auth');

router.post('/addToWatchlist',auth,addToWatchlist);
router.post('/removeFromWatchlist',auth,removeFromWatchlist);

module.exports=router;