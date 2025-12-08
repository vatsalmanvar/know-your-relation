require('dotenv').config();

const config = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://vatsalmanvar_db_user:4Xx2l20dl7TOny1h@knowyourrelationcluster.yihvcdh.mongodb.net/?appName=KnowYourRelationCluster',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRE || '7d',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
};

module.exports = config;

