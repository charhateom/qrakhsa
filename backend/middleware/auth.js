const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access Denied - No Token Provided" });
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
      return res.status(401).json({ message: "Invalid Token Format" });
    }

    const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.admin = verified; // Attach admin details to request
    console.log("Verified Admin:", verified);

    next();
  } catch (error) {
    console.error("Token Verification Failed:", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
