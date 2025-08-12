const room  = require ("../models/room");
const User = require ("../models/user");

exports.createRoom = async (req, res)=>{
    try{
        const{mapId} = req.body;
        const hostUserId = req.user.id;

        const map = await Map.findById(mapId);
        if(!map){
            return res.status(404).json({msg:"map not found"})
        };
        const room = new room ({
            hostUser : hostUserId,
            map: mapId,
            users:[hostUserId],
        });
        await room.save();
        res.status(201).json({msg:"Room successfully created", room});
    }catch(error){
        res.status(500).json({msg:"Error creating room ", error:error.msg});
    };
};

