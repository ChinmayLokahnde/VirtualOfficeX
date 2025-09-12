const Sprint = require("../models/Sprint");
const Task = require("../models/Task");

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

exports.getAllSprints = async (req,res)=>{
    try{

    }catch(err){
        
    }
}
