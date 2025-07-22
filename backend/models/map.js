const mongoose = require("mongoose");

const MapSchemas  = new mongoose.Schema({
    name:{type:String, require:true},
    backgroundImage:String,
    layoutJson:Object,
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    isPublic:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model("Map", MapSchemas);