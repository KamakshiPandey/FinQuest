const mongoose = require('mongoose');

const newsSchema=new mongoose.Schema({
    news_id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    url:{
        type:String,
    },
    image_url:{
        type:String,
    },
    publish_date:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24*7,
    },

});

module.exports=mongoose.model("News",newsSchema);