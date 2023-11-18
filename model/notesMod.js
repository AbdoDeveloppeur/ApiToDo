import mongoose from "mongoose";
const NotesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true],
  },

  title: {
    type: String,
    required: [true, "title is required"],
    maxlength: [40, "title cannot be more than 40 characters"],
  },
  description: {
    type: String,
    required: [true],
    maxlength: [200, "description cannot be more than 40 characters"],
  },
  color: {
    type: String,
    default: "#ffffff",
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("notesinfo", NotesSchema,"notes");
