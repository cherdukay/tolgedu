const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [10, 'Content must be at least 10 characters long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  }
}, {
  timestamps: true
});

// Add index for better query performance
postSchema.index({ author: 1, createdAt: -1 });

// Method to return post with populated author (excluding password)
postSchema.methods.withAuthor = function() {
  return this.populate('author', '-password');
};

// Virtual for post URL
postSchema.virtual('url').get(function() {
  return `/posts/${this._id}`;
});

// Ensure virtuals are included in JSON output
postSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;