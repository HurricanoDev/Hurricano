const { MessageEmbed } = require("discord.js");
const { Menu } = require('discord.js-menu')
const { readdirSync } = require('fs');
const cmdmap = {};
readdirSync("./bot-files/commands").forEach(dir => {
   readdirSync(`./bot-files/commands/${dir}/`).filter(file =>
     file.endsWith(".js")).forEach(cmds => {
        if (cmdmap[dir] == undefined) {
            cmdmap[dir] = []
                   }
                   cmdmap[dir].push(`\`${cmds.replace('.js', '')}\`, `)
     })
    })
module.exports = {
  name: "help",
  description: "Shows the commands list and also specific command categories/commands!",
  aliases: ["cmd", "commands", "h"],
  run: async (message, args) => {
 const client = require('../../handler-client/Client.js');
    let tips = ["Tips..."]
 
    let TIP = Math.floor(Math.random() * tips.length);
    let Fact = tips[TIP];
 
    const author = message.author;
 
    let inline = true
 
    const main = new MessageEmbed()
    .setTitle("Help Categories")
    .setDescription("React to the respective emojies below. This message will edit when reacting to an emoji. **Please wait for me to add the reactions first, before reacting!**")
    .setColor("#ffb6c1")
    .addField("> :game_die:  Important", "The most important commands in the bot such as support, help, invite etc", inline)
    .addField("> :card_index:  Information", "Shows information about users, servers, bots, maybe some other things too!", inline)
    .addField("> :hammer:  Moderation", "Make your life easier with my moderation module.", inline)
    .addField(":bulb:  TIP:", `${Fact}`)
    .setFooter("Copyright © 2020 HamBot")
 
    //-------------------------------------
 
    const config = new MessageEmbed()
    .setAuthor('Configuration!', 'https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/SetAuthorEmojis/Config.png')
    .setColor("#ffb6c1")
    .setDescription("The most important commands in the bot such as support, help, invite etc. **React** with :house: to get back to the main page.")
    .addField("Commands", cmdmap.config.join(' '))
    .setImage("https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/categories/Config.jpg")
    .setFooter("Copyright DragonNight™")
 
    //--------------------------------------

    const information = new MessageEmbed()
    .setAuthor('Information!', 'https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/SetAuthorEmojis/Information.png')
    .setColor("#ffb6c1")
    .setDescription("Shows information about users, servers, bots, maybe some other things too! **React** with :house: to get back to the main page.")
    .addField("Commands", cmdmap.information.join(' '))
    .setImage("https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/categories/Information.jpg")
    .setFooter("Copyright DragonNight™")
 
    //---------------------------------------
 
    const fun = new MessageEmbed()
    .setAuthor('Fun!', 'https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/SetAuthorEmojis/Fun.png')
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon! **React** with :house: to get back to the main page.")
    .addField("Commands", cmdmap.fun.join(' '))
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790350270781063188/Hammy_Fun.png?width=1025&height=342")
    .setFooter("Copyright DragonNight™")
 
    //-----------------------------------------
    const giveaways = new MessageEmbed()
    .setAuthor('Giveaways!', 'https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/SetAuthorEmojis/Giveaway.gif')
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon! **React** with :house: to get back to the main page.")
    .addField("Commands", cmdmap.giveaways.join(' '))
    .setImage("https://raw.githubusercontent.com/DragonNightBot/DragonNightImages/master/categories/Giveaway.jpg")
    .setFooter("Copyright DragonNight™")
 

    let helpMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: main,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                }
            },
            {
                name: 'config',
                content: config,
                reactions: {
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                }
            },
            {
                name: 'information',
                content: information,
                reactions: {
                    '🎲': 'config',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                }
            },
            {
                name: 'fun',
                content: fun,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🦁': 'giveaways',
                }
            },
            {
                name: 'giveaways',
                content: giveaways,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🐬': 'fun',
                }
            },
        ], 15000)
        helpMenu.start()
  }
}
