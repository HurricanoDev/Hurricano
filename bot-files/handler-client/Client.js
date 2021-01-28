const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');

//--------------------------------------------------GIVEAWAYS CONFIG-------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect(config.mongouri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Giveaway DB connected to MongoDB!');
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
class GiveawayManagerWithMongoose extends GiveawaysManager {
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

const manager = new GiveawayManagerWithMongoose(client, {
    updateCountdownEvery: 6969,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;
//-------------------------------------------------------------------DONE--------------------------------------
client.on('message', async message => {
    
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
    return message.channel.send(`Hii! <@${message.author.id}>, My prefix is \`${config.prefix}\`!`);
 }
    if(message.author.bot || message.channel.type === "dm") return;
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
  }) 
const mongoconnect = require('../utilities/mongoconnect.js')

const connectmongo = async () => {
  await mongoconnect().then((mongoose) => {
    try {
      console.log('MongoDB Connected!')
    } finally {
      mongoose.connection.close()
    }
    })
  } 
connectmongo()

module.exports = client;
