const Sprint = require("../models/Sprint");
const Task = require("../models/Task");

//create 
exports.createSprint = async (req,res)=>{
    try{
        const {name, startDate, endDate} = req.body;
        const createdBy = req.user.id;

        const sprint = new Sprint({
            name,
            startDate,
            endDate,
            createdBy,
        });
        await sprint.save();
        res.status(201).json({msg: "Sprint created Successfully", sprint});
    }catch(err){
        res.status(500).json({msg: "Error in creating Sprint", err:err.msg})
    };
};

//update
exports.updateSprint = async (req, res)=>{
    try{
        const {sprintId} = req.params;
        const {name, isActive, startDate, endDate} = req.body;

        const sprint = await Sprint.findByIdAndUpdate(
            sprintId,
            {name, isActive, startDate, endDate},
            {new: true},
        );
        if(!sprint) return res.status(404).json({msg: "sprint is not available"});

        res.status(200).json({msg:"sprint updated successfully", sprint});
    }catch(err){
        res.status(500).json({msg: "Error in creating Sprint", err:err.msg})
    };
};

//delete
exports.deleteSprint = async (req, res)=>{
    try{
        const {sprintId} = req.params;

        const sprint = await Sprint.findByIdAndDelete(sprintId);
        if(!sprint) return res.status(404).json({msg: "sprint not found"});

        res.status(200).json({msg: "sprint deleted successfully", sprint});;
    }catch(err){
        res.status(500).json({msg: "Error in deleteing sprint", err:err.msg})
    };
};

//get all
exports.getAllSprints = async (req,res)=>{
    try{
        const sprints = await Sprint.find()
        .populate("createdBy", "username email")
        .populate("task");

        res.status(200).json(sprints);
    }catch(err){
        res.status(500).json({msg: "Error fetching data", err:err.msg})  
    };
};

//get by id
exports.getSprintById = async (req,res)=>{
    try{
        const {sprintId} = req.params;

        const sprint = await Sprint.findById(sprintId)
        .populate("createdBy", "username email")
        .populate({
            path: "task",
            populate: {path: "assigned createdBy", select: "username email"},
        });
        if(!sprint) return res.status(404).json({msg: "Sprint not found"});

        res.status(200).json(sprint)
    }catch(err){
        res.status(500).json({msg: "Error fetching sprint", err:err.msg});
    }
};


