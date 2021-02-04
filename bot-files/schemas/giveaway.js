const client = require('../handler-client/Client.js');
const config = require('../../config.json');
const mongoose = require('mongoose'); 
mongoose.connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    });
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
      console.log('[Giveaways] Giveaway DB connected to MongoDB!');
  });
  
  const giveawaySchema = new mongoose.Schema({
      messageID: String,
      channelID: String,
      guildID: String,
      startAt: Number,
      endAt: Number,
      ended: Boolean,
      winnerCount: Number,
      prize: String,
      messages: {
          giveaway: String,
          giveawayEnded: String,
          inviteToParticipate: String,
          timeRemaining: String,
          winMessage: String,
          embedFooter: String,
          noWinner: String,
          winners: String,
          endedAt: String,
          hostedBy: String,
          units: {
              seconds: String,
              minutes: String,
              hours: String,
              days: String,
              pluralS: Boolean,
          },
      },
      hostedBy: String,
      winnerIDs: [],
      reaction: String,
      botsCanWin: Boolean,
      embedColor: String,
      embedColorEnd: String,
      exemptPermissions: [],
      extraData: {}
  });
  
  const giveawayModel = mongoose.model('giveaways', giveawaySchema);
  
  const { GiveawaysManager } = require('discord-giveaways');
  class Gmanager extends GiveawaysManager {
      async getAllGiveaways() {
          return await giveawayModel.find({});
      }
      async saveGiveaway(messageID, giveawayData) {
          await giveawayModel.create(giveawayData);
          return true;
      }
      async editGiveaway(messageID, giveawayData) {
          await giveawayModel
              .findOneAndUpdate({ messageID: messageID }, giveawayData)
              .exec();
          return true;
      }
      async deleteGiveaway(messageID) {
          await giveawayModel
              .findOneAndDelete({ messageID: messageID })
              .exec();
          return true;
      }
  }
  
  const manager = new Gmanager(client, {
      updateCountdownEvery: 6969,
      default: {
          botsCanWin: false,
          exemptPermissions: ['ADMINISTRATOR'],
          embedColor: '#034ea2',
          reaction: '🎉'
      }
  });
  client.giveawaysManager = manager;