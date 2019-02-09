const mongoose = require("mongoose");
require('./model')
const Week = mongoose.model('Week')

exports.createNewWeek = async (req, res) => {
  try {
    const week = new Week({
      staff: req.body.staff,
      dateFrom: req.body.dateFrom,
      dateUntil: req.body.dateUntil,
      upVotes: 0,
      downVotes: 0
    })
  
    const savedWeek = await week.save()
    return res.send(savedWeek)
  } catch (error) {
    return res.status(400).send(error)
  }
}

exports.vote = async (req, res) => {
  const weekId = req.params.id
  const voteType = req.params.type === 'up' ? 'upVotes' : 'downVotes'
  let updatedWeek;
  try {
    updatedWeek = await Week.findByIdAndUpdate(weekId, {
      $inc: {
        [voteType]: 1
      }
    }, {
      new: true
    })
  } catch (error) {
    return res.status(400).send('Something went wrong. See error log below\n\n', error)
  }
  return res.send({updatedWeek})
}

exports.getCurrentWeek = async (req, res) => {
  const now = new Date()
  const currentWeek = await Week.findOne({
    dateFrom: {
      $lte: now
    },
    dateUntil: {
      $gte: now
    }
  })

  return res.send({
    currentWeek
  })
}