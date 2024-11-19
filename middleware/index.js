export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({error: "Unauthorized: No token provided"});
  }

  // Example token validation
  if (token !== "valid-token") {
    return res.status(403).json({error: "Forbidden: Invalid token"});
  }

  next();
};
