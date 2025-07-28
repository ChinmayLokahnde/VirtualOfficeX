import mongoose from "mongoose";

const SprintSchemas = new mongoose.Schema({
    name:String,
    startDate: Date,
    endDate: Date,
    tasks:[{type: mongoose.Schema.ObjectId, ref:'Task'}],
    createdBy:{type: mongoose.Schema.ObjectId, ref:'User'},
});

export default mongoose.model('Sprint', SprintSchemas);