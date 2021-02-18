const mongoose = require('mongoose')
const client = global.client
const mongoPath = client.config.mongouri;

module.exports = {
    init: function (){
        mongoose.connect(mongoPath, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
          })
    }
}