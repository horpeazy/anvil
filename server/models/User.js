const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
  },
  profileImageUrl: {
    type: String,
    required: [true, 'Profile image URL is required'],
    trim: true,
  },
  profileId: {
    type: Number,
    required: [true, 'Profile ID is required'],
  },
});

module.exports = mongoose.model('User', UserSchema);
