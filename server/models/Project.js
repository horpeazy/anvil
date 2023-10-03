const mongoose = require('mongoose');
const User = require('./User');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  owner: { 
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true,
  },
  files: {
    type: Object,
    default: {
      id: "1",
      name: "root",
      isFolder: true,
      items: [],
    },
  },
  contributors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  sharedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  isDraft: {
  	type: Boolean,
  	default: true
  },
  deleted: Boolean,
  timeDeleted: Date,
});

module.exports = mongoose.model('Project', ProjectSchema);
