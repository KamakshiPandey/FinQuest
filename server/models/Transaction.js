const mongoose = require('mongoose');

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    stockSymbol:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    tradeValue:{
        type:Number,
        required:true,
    },
    orderDate:{
        type:Date,
        default:Date.now,
    },
    orderType:{
        type:String,
        enum:["Buy","Sell"]
    },

    //status buy / sell 
    
});

module.exports=mongoose.model("Transaction",transactionSchema);