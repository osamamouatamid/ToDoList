import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dueDate: {
      type: Date
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
