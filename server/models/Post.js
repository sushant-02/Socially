const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: 4,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Content is required."],
      minlength: 10,
      maxlength: 2000,
    },
    image: {
      type: Buffer,
      contentType: String,
    },
    postedBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
