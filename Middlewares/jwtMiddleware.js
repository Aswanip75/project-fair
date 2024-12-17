const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: "Please provide a valid token with 'Bearer <token>' format" });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' from the token

    try {
        // Verify token and decode it
        const jwtVerification = jwt.verify(token, process.env.jwtkey);
        console.log("JWT Verification:", jwtVerification);

        // Attach userId to req.payload (this will be used in the projectController)
        req.payload = jwtVerification; // Ensure this contains userId

        next();
    } catch (err) {
        console.error("JWT Error:", err);  // Log error for debugging
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = jwtMiddleware;
