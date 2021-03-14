const { MessageEmbed } = require("discord.js");
const { Menu } = require('discord.js-menu')
const { readdirSync } = require('fs');
const cmdmap = {};
readdirSync("./bot/commands").forEach(dir => {
   readdirSync(`./bot/commands/${dir}/`).filter(file =>
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
    .setFooter("Copyright Hurricano™")
 
    //-------------------------------------
 
    const config = new MessageEmbed()
    .setAuthor('Configuration!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Config.png')
    .setColor("#ffb6c1")
    .setDescription("The most important commands in the bot such as support, help, invite etc. **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.config.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Config.jpg")
    .setFooter("Copyright Hurricano™")
 
    //--------------------------------------

    const information = new MessageEmbed()
    .setAuthor('Information!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Information.png')
    .setColor("#ffb6c1")
    .setDescription("Shows information about users, servers, bots, maybe some other things too! **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.information.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Information.jpg")
    .setFooter("Copyright Hurricano™")
 
    //---------------------------------------
 
    const fun = new MessageEmbed()
    .setAuthor('Fun!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Fun.png')
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon!  **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.fun.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Fun.jpg")
    .setFooter("Copyright Hurricano™")
 
    //-----------------------------------------
    const giveaways = new MessageEmbed()
    .setAuthor('Giveaways!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif')
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon! **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.giveaways.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg")
    .setFooter("Copyright Hurricano™")
 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 const image = new MessageEmbed()
 .setAuthor('Image Manipulation!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/ImageManip.png')
 .setColor("#ffb6c1")
 .setDescription("These are some fun image commands you can use! **React** with other emojis to see what else there is!")
 .addField("Commands", cmdmap.image.join(' '))
 .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg")
 .setFooter("Copyright Hurricano™")
    let helpMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: main,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                    '📷': 'image',
                }
            },
            {
                name: 'config',
                content: config,
                reactions: {
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                    '📷': 'image',

                }
            },
            {
                name: 'information',
                content: information,
                reactions: {
                    '🎲': 'config',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                    '📷': 'image',

                }
            },
            {
                name: 'fun',
                content: fun,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🦁': 'giveaways',
                    '📷': 'image',
                }
            },
            {
                name: 'giveaways',
                content: giveaways,
                reactions: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🐬': 'fun',
                    '📷': 'image',
                }
            },
            {
                name: 'image',
                content: image,
                reations: {
                    '🎲': 'config',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
                }
            }
        ], 15000)
        helpMenu.start()
  }
}
