const { MessageEmbed } = require("discord.js");
const { Menu } = require('discord.js-menu')
const { readdirSync } = require('fs');
const emojis = require('../../utilities/emojis.json')
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
    .setDescription("React to the respective emojis below. This message will edit when reacting to an emoji. **Please wait for me to add the reactions first, before reacting!**")
    .setColor("#ffb6c1")
    .addField("> :gear: Config", "The commands meant to modify the bot.", inline)
    .addField("> :mag:  Information", "Pretty self-explanitory! This module is meant for information commands.", inline)
    .addField("> :video_game:  Fun", "Commands in which you're sure to have fun!", inline)
    .addField(`> ${emojis.giveaways}  Giveaways`, "Host giveaways with Hurricano™️!", inline)
    .addField(`> :camera:  Image Manipulation`, "Make funny images with Hurricano™️!", inline)
    .addField(`> ${emojis.owner}  Owner`, "Commands meant for the bot owners.", inline)
    .addField(":bulb:  TIP:", `${Fact}`)
    .setFooter("Copyright Hurricano™")
 
    //-------------------------------------
 
    const config = new MessageEmbed()
    .setAuthor('Configuration!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Config.png')
    .setColor("#ffb6c1")
    .setDescription("The commands meant to modify the bot. **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.config.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Config.jpg")
    .setFooter("Copyright Hurricano™")
 
    //--------------------------------------

    const information = new MessageEmbed()
    .setAuthor('Information!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Information.png')
    .setColor("#ffb6c1")
    .setDescription("Pretty self-explanitory! This module is meant for information commands. **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.information.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Information.jpg")
    .setFooter("Copyright Hurricano™")
 
    //---------------------------------------
 
    const fun = new MessageEmbed()
    .setAuthor('Fun!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Fun.png')
    .setColor("#ffb6c1")
    .setDescription("Commands in which you're sure to have fun! **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.fun.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Fun.jpg")
    .setFooter("Copyright Hurricano™")
 
    //-----------------------------------------
    const giveaways = new MessageEmbed()
    .setAuthor('Giveaways!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif')
    .setColor("#ffb6c1")
    .setDescription("Host giveaways with Hurricano™️! **React** with other emojis to see what else there is!")
    .addField("Commands", cmdmap.giveaways.join(' '))
    .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg")
    .setFooter("Copyright Hurricano™")
 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 const image = new MessageEmbed()
 .setAuthor('Image Manipulation!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/ImageManip.png')
 .setColor("#ffb6c1")
 .setDescription("Make funny images with Hurricano™️! **React** with other emojis to see what else there is!")
 .addField("Commands", cmdmap.image.join(' '))
 .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Image.jpg")
 .setFooter("Copyright Hurricano™")
 // - - --- - - - - -- - - - - - - -- - - - - - -------------------------------------------------------
 const owner = new MessageEmbed()
 .setAuthor('Bot Owner Commands!', 'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/owner.png')
 .setColor("#ffb6c1")
 .setDescription("Commands meant for the bot owners. **React** with other emojis to see what else there is!")
 .addField("Commands", cmdmap.owner.join(' '))
 .setImage("https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Owner.jpg")
 .setFooter("Copyright Hurricano™")


 const gwid = emojis.giveaways.split(':')[2].split('<')[0].split('>')[0];
 const owid = emojis.owner.split(':')[2].split('<')[0].split('>')[0]
    let helpMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: main,
                reactions: {
                    '⚙️': 'config',
                    '🔍': 'information',
                    '🎮': 'fun',
                    [gwid]: 'giveaways',
                    '📷': 'image',
                    [owid]: 'owner',

                }
            },
            {
                name: 'config',
                content: config,
                reactions: {
                    '🔍': 'information',
                    '🎮': 'fun',
                    [gwid]: 'giveaways',
                    '📷': 'image',
                    [owid]: 'owner',

                }
            },
            {
                name: 'information',
                content: information,
                reactions: {
                    '⚙️': 'config',
                    '🎮': 'fun',
                    [gwid]: 'giveaways',
                    '📷': 'image',
                    [owid]: 'owner',
                }
            },
            {
                name: 'fun',
                content: fun,
                reactions: {
                    '⚙️': 'config',
                    '🔍': 'information',
                    [gwid]: 'giveaways',
                    '📷': 'image',
                    [owid]: 'owner',
                }
            },
            {
                name: 'giveaways',
                content: giveaways,
                reactions: {
                    '⚙️': 'config',
                    '🔍': 'information',
                    '🎮': 'fun',
                    '📷': 'image',
                    [owid]: 'owner',
                }
            },
            {
                name: 'image',
                content: image,
                reactions: {
                    '⚙️': 'config',
                    '🔍': 'information',
                    '🎮': 'fun',
                    [gwid]: 'giveaways',
                    [owid]: 'owner',
                },
            },
            {
                name: 'owner',
                content: owner,
                reactions: {
                    '⚙️': 'config',
                    '🔍': 'information',
                    '🎮': 'fun',
                    [gwid]: 'giveaways',
                    '📷': 'image',
                },
            }
        ], 30000)
        helpMenu.start()
  }
}
