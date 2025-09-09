const map = require("../models/map");
const Map = require ("../models/map");

exports.createMap = async (req,res) =>{
    try{
        const {name,backgroundImage, layoutJson, isPublic } = req.body;
        
        const newMap = new Map({
            name,
            backgroundImage,
            layoutJson,
            owner: req.user.id,
            isPublic,

        });
        await newMap.save();
        res.status(200).json(newMap);
    }catch(error){
        res.status(500).json({Message:"Error in creating map", error:error.Message})
    };
};

exports.getPublicMaps = async (req,res)=>{
    try{
        const maps = await Map.find({isPublic:true}).populate("owner", "username email");
        res.json(maps)
    }catch(error){
        res.status(500).json({Message: "error in fetching maps", error: error.Message})
    };
};

exports.getMyMaps = async(req,res)=>{
    try{
        const maps = await Map.find({owner: req.user.id})
        res.json(maps)
    }catch (error){
        res.status(500).json({msg: "error in fetching your map something is up with this backend badboy", error: error.msg})
    };
};

exports.getMapById = async (req,res)=>{
    try{
        const map = await Map.findById(req.params.id).populate("owner", "username email")
        if(!map) return res.status(404).json({msg: "your map not found "});

        if(!map.isPublic && map.owner._id.toString() !==req.user.id){
            return res.status(403).json({msg:"you are not authorized user can't see map no no!"});
        }
        res.json(map)
    }catch(err){
        res.status(500).json({msg: "server error while fetchig map", err: err.msg})
    };
};

exports.updateMap = async(req,res)=>{
    try{
        const map = await Map.findById(req.params.id)
        if(!map) return res.status(404).json({msg:"Map not Found"});

        if(map.owner.toString() !==req.user.id){
            return res.status(403).json({msg : "you are not authorized to access this map"})
        }

        const updates = req.body;
        Object.assign(map, updates);
        await map.save()
        
        res.json(map);
    }catch(err){
        res.status(500).json({msg: "error while updateing map", err:err.msg})
    };
};

exports.deleteMap = async(req,res)=>{
    try{
        const map = await Map.findById(req.params.id);
        if(!map) return res.status(404).json({msg:"Map not Found"});
        
        if(map.owner.toString() !==req.user.id){
            return res.status(403).json({msg : "you are not authorized to access this map"})
    };

    await map.deleteOne();
    res.status(200).json({msg: "map deleted successfully..."})

    } catch(err){
        res.status(500).json({msg: "error while deleting map", err:err.msg})
    };
};


