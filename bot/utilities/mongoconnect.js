const mongoose = require('mongoose')
const config = require('../../config.json')
const mongoPath = config.mongouri;

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  return mongoose
}