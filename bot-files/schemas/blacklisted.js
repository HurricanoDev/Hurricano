const mongoose = require('mongoose')

const blacklistSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('blacklisted', blacklistSchema)
