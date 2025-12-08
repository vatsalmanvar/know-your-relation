const mongoose = require('mongoose');
const config = require('./config/config');

const connectToMongo = async () => {
  try {
    // Mongoose 6+ has useNewUrlParser and useUnifiedTopology enabled by default
    await mongoose.connect(config.mongodb.uri);
    
    if (config.nodeEnv !== 'test') {
      console.log('✓ Connected to MongoDB successfully');
    }

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    throw err;
  }
};

module.exports = connectToMongo;
