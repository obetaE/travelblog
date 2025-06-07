import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    comments: [CommentSchema],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PostModel = models.PostModel || mongoose.model("PostModel", PostSchema);
export default PostModel;
