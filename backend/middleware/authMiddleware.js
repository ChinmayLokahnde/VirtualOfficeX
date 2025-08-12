const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
        return res.status(401).json({ msg: "No token, cannot authorize user" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not verified" });
    }
};

module.exports = authMiddleware;
