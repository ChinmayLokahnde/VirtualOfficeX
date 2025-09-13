const Message = require("../models/map");
const Room = require("../models/Room");

exports.sendMessage = async (req,res)=>{
    try{
        const {roomId} = req.params;
        const {content} = req.body;

        if(!content){
            return res.status(400).json({msg: "message content is required"})
        };

        const room = await Room.findOne(roomId);
        if(!room){
            return res.status(404).json({msg: "room not found"});
        };

        const message = await Message.create({
            room: roomId,
            sender: req.user.id,
            content,
        });
        res.status(201).json(message)
    }catch(err){
        res.status(500).json({msg: "Error in sending message", err:err.msg});
    }
};

exports.getAllMessage = async (req,res)=>{
    try{
        const {roomId} = req.params;

        const message = await Message.find({room: roomId})
        .populate("sender", "username email")
        .sort({createdAt: 1});

        res.status(200).json(message)
    }catch(err){
        res.status(500).json({msg: "Error in fetching messages", err:err.msg});
    }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.sender.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You cannot delete this message" });
    }

    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error: error.message });
  }
};

