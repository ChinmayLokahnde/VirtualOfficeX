const Task = require ("../models/Task");
const Sprint = require("../models/Sprint");
const User = require("../models/User");


exports.createTask = async (req,res)=>{
    try{
        const {title, description, lables, assignedTo, sprintId} = req.body;
        const createdBy = req.user.id;

        const sprint = await Sprint.findById(sprintId);
        if(!sprint){
            return res.status(404).json({msg: "Sprint not found"})
        };

        const task = new Task ({
            title,
            description,
            lables,
            assignedTo,
            createdBy,
            sprint: sprintId,
        });
        await task.save();
        res.status(201).json({msg: "Task created succesfully", task});
    }catch(err){
        res.status(500).json({msg:"Server error in creating task", err: err.msg})
    };
};


exports.updateTask = async(req,res)=>{
    try{
        const {taskId} = req.params;
        const {title, description, lables, status, assignedTo} = req.body;

        const task = await Task.findByIdAndUpdate(
            taskId,
            {title, description, lables, status, assignedTo},
            {new: true},
        );
        if(!task)return res.status(404).json({msg: "Task not found"});

        res.status(200).json({msg: "Task Updated successfully", task});
    }catch(err){
        res.status(500).json({msg: "Server error in task updation", err:err.msg})
    };
};



exports.deleteTask = async (req,res)=>{
    try{
        const {taskId} = req.params;

        const task = await Task.findByIdAndDelete(taskId);
        if(!task) return res.status(404).json({msg: "task not found"});

        res.status(200).json({msg: "task deleted successfully"});

    }catch(err){
        res.status(500).json({msg:"server error in deleting tasks", err:err.msg})
    };
};


exports.getTaskBySprint = async (req,res)=>{
    try{
        const {sprintId} = req.params;

        const task = await Task.find({sprint: sprintId})
        .populate("assignedTo", "username email")
        .populate("createdBy", "username email");

        res.status(200).json(task);
    }catch(err){
        res.status(500).json({msg:"Error fetching task", err:err.msg})
    };
};


exports.getTaskDetails = async (req,res)=>{
    try{
        const {taskId} = req.params;

        const task = await Task.findById(taskId)
        .populate("assignedTo", "username email")
        .populate("assignedTo", "username email")
        .populate("assignedTo", "username email")

        if(!task) return res.status(404).json({msg:"task detail not found"});

        res.status(200).json(task);
    }catch(err){
        res.status(500).json({msg: "Error fetching task", err: err.msg})
    };
};


exports.addComments = async (req,res)=>{
    try{
        const {taskId} = req.params;
        const {text} = req.body;
        const userId = req.params.id;

        const task = await Task.findByIdAndDelete(taskId);
        if(!task) return res.status(404).json({msg: "task not found"});

        const comment = {
            user: userId,
            text,
            createdAt: new Date(),
        };

        task.comments.push(comment);
        await task.save();

        res.status(200).json({msg: "comment added", task});
    }catch(err){
        res.status(500).json({msg: "Error in adding comment", err:err.msg})
    };
};


