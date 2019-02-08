const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weekSchema = new Schema({
  staff: {
    type: String,
    required: true
  },
  dateFrom: {
    type: Date,
    required: true
  },
  dateUntil: Date,
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Week", weekSchema);