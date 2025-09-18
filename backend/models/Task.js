const mongoose = require ("mongoose");

const TaskSchema = new mongoose.Schema({
    title:String,
    description:String,
    lables:[String],
    status: {type:String, enum:['todo', 'in-process', 'done'], default:'todo' },
    assignedTo:{type: mongoose.Schema.ObjectId, ref:' User'},
    createdBy:{type:mongoose.Schema.ObjectId, ref: 'User'},
    sprint:{type: mongoose.Schema.ObjectId, ref: 'Sprint'},
    comments: [{
        user: {type: mongoose.Schema.ObjectId, ref: 'User'},
        text: {type: String},
        createdAt:Date,
    }]
}, {timestamps: true});

module.expports =  mongoose.model('Task', TaskSchema);