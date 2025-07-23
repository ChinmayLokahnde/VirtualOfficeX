const jwt = require("jsonwebtoken");

const authMiddleware  = (req, res, next)=>{
    const token = req.header("Authorization")?.replace("Bearer", "");
    if(!token) return res.status(401).json({msg:"No token , cannot authorize user"});

    try{
        const decoded = jwt.verify(process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        res.status(401).json({msg:"token is not verified"})
    }
};

module.exports = authMiddleware;