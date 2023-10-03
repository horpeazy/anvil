const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require("../models/User");
const { decryptData } = require("../utils");
dotenv.config();

const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring('Bearer '.length);
    try {
      const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);
      const userId = decodedToken.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authenticateUser;

