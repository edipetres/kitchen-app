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
  votes: [
    {
      date: Date,
      vote: {
        type: String, 
        enum: ['up', 'down']
      }
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model("Week", weekSchema);