<<<<<<< HEAD
const { MessageEmbed } = require("discord.js");
const { Menu } = require('discord.js-menu')
const { readdirSync } = require('fs');
const lmao = [];
readdirSync("./bot-files/commands").forEach(dir => {
   readdirSync(`./bot-files/commands/${dir}/`).filter(file =>
     file.endsWith(".js")).forEach(kek => lmao.push(kek))
   });
=======
// Import MessageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
const { Menu } = require('discord.js-menu')
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1

module.exports = {
  name: "help",
  description: "Shows the commands list and also specific command categories/commands!",
  aliases: ["cmd", "commands", "h"],
  usage: "ham help / ham help [command]",
<<<<<<< HEAD
  run: async (message, args) => {
 const client = require('../../handler-client/Client.js');
 const { CONFIG, FUN, INFORMATION, GIVEAWAYS } = client.categories;
    let tips = ["HamBot was made in the early september of 2020.", "HamBot used to have an economy system but was sadly removed :sad:", "HamBot is mainly based on Image Manpulation", "HamBot had over 100 commands before it was remade.", "HamBot has several partners: Raccoon and Cosmic!", "The heads on Easter Island have bodies.", "The moon has moonquakes.", "Goosebumps are meant to ward off predators", "Humans are the only animals that blush.", "HamBot is coded in a language called JavaScript.", "HamBot has over 7000 lines of code if put in one file!"]
 
    let TIP = Math.floor(Math.random() * tips.length);
    let Fact = tips[TIP];
 
    const author = message.author;
 
    let inline = true
 
=======
  run: async (client, message, args) => {

    let tips = ["HamBot was made in the early september of 2020.", "HamBot used to have an economy system but was sadly removed :sad:", "HamBot is mainly based on Image Manpulation", "HamBot had over 100 commands before it was remade.", "HamBot has several partners: Raccoon and Cosmic!", "The heads on Easter Island have bodies.", "The moon has moonquakes.", "Goosebumps are meant to ward off predators", "Humans are the only animals that blush.", "HamBot is coded in a language called JavaScript.", "HamBot has over 7000 lines of code if put in one file!"]

    let TIP = Math.floor(Math.random() * tips.length);
    let Fact = tips[TIP];

    const author = message.author;

    const dm = new MessageEmbed()
    .setAuthor("Parametes/Links", client.user.displayAvatarURL())
    .setColor("#ffb6c1")
    .setDescription("🔔  [Invite](https://dsc.gg/hambot)\n☢️  [Top.gg](https://top.gg/bot/765465324661112863)\n♏  [Vote](https://top.gg/bot/765465324661112863/vote)\n\nArgument Definitions in commands:\n`<>` means it's required\n`()` means it's optional\n`[]` means you have to choose one of the following\n\n**Do not actually include the <>, (), or {} symbols in the command.**")
    .setFooter("This message will be automatically deleted in 2 minutes due to congestion")
    let send = await author.send(dm)
    send.react("🔔")
    send.react("☢️")
    send.react("♏")
    send.delete({ timeout: 120000 })

    let inline = true

>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
    const main = new MessageEmbed()
    .setTitle("Help Categories")
    .setDescription("React to the respective emojies below. This message will edit when reacting to an emoji. **Please wait for me to add the reactions first, before reacting!**")
    .setColor("#ffb6c1")
    .addField("> :game_die:  Important", "The most important commands in the bot such as support, help, invite etc", inline)
    .addField("> :card_index:  Information", "Shows information about users, servers, bots, maybe some other things too!", inline)
    .addField("> :dolphin:  Fun", "This is a fun category with some fun commands, many coming soon!", inline)
    .addField("> :lion_face:  Animal", "This is a category which shows you a variety of animal pictures!", inline)
    .addField("> :camera:  Image", "Say cheese! Now we have an image module with tonnes of commands", inline)
    .addField("> :hammer:  Moderation", "Make your life easier with my moderation module.", inline)
    .addField(":bulb:  TIP:", `${Fact}`)
    .setFooter("Copyright © 2020 HamBot")
<<<<<<< HEAD
 
    //-------------------------------------
 
    const config = new MessageEmbed()
    .setTitle(":game_die:  Important Commands")
    .setColor("#ffb6c1")
    .setDescription("The most important commands in the bot such as support, help, invite etc. **React** with :house: to get back to the main page.")
    .addField("Commands", lmao[CONFIG])
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790356472935743518/Hammy_Important.jpg?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")
 
    //--------------------------------------
 
=======

    //-------------------------------------

    const important = new MessageEmbed()
    .setTitle(":game_die:  Important Commands")
    .setColor("#ffb6c1")
    .setDescription("The most important commands in the bot such as support, help, invite etc. **React** with :house: to get back to the main page.")
    .addField("Commands", "`help`, `ping`, `invite`, `support`, `bug`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790356472935743518/Hammy_Important.jpg?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")

    //--------------------------------------

>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
    const information = new MessageEmbed()
    .setTitle(":card_index:  Information Commands")
    .setColor("#ffb6c1")
    .setDescription("Shows information about users, servers, bots, maybe some other things too! **React** with :house: to get back to the main page.")
<<<<<<< HEAD
    .addField("Commands", lmao[INFORMATION])
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790035545522438184/Hammy_Information.png?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")
 
    //---------------------------------------
 
=======
    .addField("Commands", "`botinfo`, `serverinfo`, `userinfo`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790035545522438184/Hammy_Information.png?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")

    //---------------------------------------

>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
    const fun = new MessageEmbed()
    .setTitle(":dolphin:  Fun Commands")
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon! **React** with :house: to get back to the main page.")
<<<<<<< HEAD
    .addField("Commands", lmao[FUN])
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790350270781063188/Hammy_Fun.png?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")
 
    //-----------------------------------------
    const giveaways = new MessageEmbed()
    .setTitle(":dolphin:  Fun Commands")
    .setColor("#ffb6c1")
    .setDescription("This is a fun category with some fun commands, many coming soon! **React** with :house: to get back to the main page.")
    .addField("Commands", lmao[GIVEAWAYS])
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790350270781063188/Hammy_Fun.png?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")
 
=======
    .addField("Commands", "`emojify`, `tictactoe`, `trivia`, `connect4`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790350270781063188/Hammy_Fun.png?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")

    //-----------------------------------------

    const animal = new MessageEmbed()
    .setTitle(":lion:  Animal Commands")
    .setColor("#ffb6c1")
    .setDescription("This is a category which shows you a variety of animal pictures!  **React** with :house: to get back to the main page.")
    .addField("Commands", "`duck`, `fox`, `bird`, `cat`, `pandafact`, `panda`, `koala`, `birb`, `redpanda`, `dog`, `kangaroo`, `seal`, `giraffe`, `penguin`, `camel`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790351770245005322/Hammy_Animal.jpg?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")

    //------------------------------------------

    const image = new MessageEmbed()
    .setTitle(":camera:  Image Commands")
    .setColor("#ffb6c1")
    .setDescription("Say cheese! Now we have an image module with tons of commands. **React** with :house: to get back to the main page.")
    .addField("Commands", "`comment`, `pat`, `wink`, `gay`, `trigger`, `wasted`, `glass`, `greyscale`, `hug`, `red`, `blue`, `green`, `clyde`, `imgfy`, `supreme`, `changemymind`, `rainbow`, `wanted`, `rip`, `hitler`, `ohno`, `pixelate`, `colorfy`, `beautify`, `burn`, `slap`, `shit`, `facepalm`, `jail`, `jokeoverhead`, `spank`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790353317226217522/Hammy_Image_Banner.jpg?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")

    //--------------------------------------------

    const moderation = new MessageEmbed()
    .setTitle(":hammer:  Moderation Commands")
    .setColor("#ffb6c1")
    .setDescription("Make your life easier with my moderation module. **React** with :house: to get back to the main page.")
    .addField("Commands", "`ban`, `addrole`")
    .setImage("https://media.discordapp.net/attachments/779867901246570549/790356601206734848/Hammy_Moderation.jpg?width=1025&height=342")
    .setFooter("Copyright © 2020 HamBot")
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1

    let helpMenu = new Menu(message.channel, message.author.id, [
            // Each object in this array is a unique page.
            {
                // A page object consists of a name, used as a destination by reactions...
                name: 'main',
                // A MessageEmbed to actually send in chat, and...
                content: main,
                // A set of reactions with destination names attached.
                // Note there's also special destination names (read below)
                reactions: {
<<<<<<< HEAD
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
=======
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation',
                }
            },
            {
                name: 'important',
                content: important,
                reactions: {
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
                }
            },
            {
                name: 'information',
                content: information,
                reactions: {
<<<<<<< HEAD
                    '🎲': 'config',
                    '🐬': 'fun',
                    '🦁': 'giveaways',
=======
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
                }
            },
            {
                name: 'fun',
                content: fun,
                reactions: {
<<<<<<< HEAD
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
=======
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
                }
            },
            {
                name: 'animal',
                content: animal,
                reactions: {
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
                }
            },
            {
                name: 'image',
                content: image,
                reactions: {
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
                }
            },
            {
                name: 'moderation',
                content: moderation,
                reactions: {
                    '🏠': 'main',
                    '🎲': 'important',
                    '📇': 'information',
                    '🐬': 'fun',
                    '🦁': 'animal',
                    '📷': 'image',
                    '🔨': 'moderation'
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
                }
            },
            // The last parameter is the number of milliseconds you want the menu to collect reactions for each page before it stops to save resources
            // The timer is reset when a user interacts with the menu.
            // This is optional, and defaults to 180000 (3 minutes).
        ], 15000)
        // Run Menu.start() when you're ready to send the menu in chat.
        // Once sent, the menu will automatically handle everything else.
        helpMenu.start()
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> b1e132119a40232170367c7863450bcae3acfff1
