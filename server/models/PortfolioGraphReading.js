const mongoose = require('mongoose');

const graphSchema=new mongoose.Schema({
    buying_value:{
        type:Number,
        required:true,
    },
    curr_value:{
        type:Number,
        required:true
    },
    time:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model("PortfolioGraphReading",graphSchema);