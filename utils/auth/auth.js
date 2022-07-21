import jwt from 'jsonwebtoken'
import logger from '../logger/winston_config.js';

const PRIVATE_KEY = process.env.PRIVATE_KEY

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({
        error: 'not authenticated'
      });
    }

      
    const token = authHeader.split(' ')[1];
   
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: 'not authorized'
        });
      }
   
      req.user = decoded.data;
      next();
    });
};

export default auth