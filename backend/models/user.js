const mongoose  = require ("mongoose");

const UserSchema = new mongoose.Schema({
    username:{type: String, required:true},
    email:{type:String, unique:true},
    password:{type:String},
    avatarUrl:{type:String},
    role:{type:String, enum:['user', 'admin'], default:'user'},
    ownedMap:[{type:mongoose.Schema.Types.ObjectId, ref:'Map'}],
    recentRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }]
})
