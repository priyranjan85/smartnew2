const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GameSchema = new Schema(
  {
    address: {
      type: String,
      required: true
    },
    payout: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Event = mongoose.model("games", GameSchema);
