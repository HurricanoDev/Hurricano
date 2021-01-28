const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
client.on('message', async message => {

    if (message.content === '<@!803169312827113483>') {
        message.channel.send('Hey! Work in progress for this.')
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

    const { GiveawaysManager } = require('discord-giveaways');
    message.client.giveawaysManager = new GiveawaysManager(client, {
     storage: "./data/giveaways.json",
     updateCountdownEvery: 6969,
     default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
})
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
