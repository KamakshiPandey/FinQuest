const mongoose = require('mongoose');

const priceStockSchema=new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true,
    },
    current_price:{
        type:Number,
        default:0,
    },
});

module.exports=mongoose.model("PriceStock",priceStockSchema);