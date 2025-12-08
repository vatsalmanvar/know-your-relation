const mongoose = require('mongoose');
const { Schema } = mongoose;

const familySchema = new Schema({
  familyName: {
    type: String,
    required: [true, 'Family name is required'],
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  globalNodes: {
    type: Array,
    required: [true, 'Global nodes are required'],
    default: [],
  },
  globalEdges: {
    type: Array,
    required: [true, 'Global edges are required'],
    default: [],
  },
}, {
  timestamps: true,
});

familySchema.index({ familyName: 1, email: 1 });

module.exports = mongoose.model('Family', familySchema);