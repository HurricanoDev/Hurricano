const { MessageEmbed } = require("discord.js");
const { Menu } = require("../../utilities/ReactionMenu.js");
const { readdirSync } = require("fs");
const emojis = require("../../utilities/emojis.json");
const cmdmap = {};
readdirSync("./bot/commands").forEach((dir) => {
  readdirSync(`./bot/commands/${dir}/`)
    .filter((file) => file.endsWith(".js"))
    .forEach((cmds) => {
      if (cmdmap[dir] == undefined) {
        cmdmap[dir] = [];
      }
      cmdmap[dir].push(`\`${cmds.replace(".js", "")}\`, `);
    });
});
const Command = require("@Command");
module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description:
        "Shows the commands list and also specific command categories/commands!",
      aliases: ["cmd", "commands", "h"],
    });
  }
  async run(message, args) {
    let tips = [
      "The first person convicted of speeding was going eight mph.",
      '"New car smell" is the scent of dozens of chemicals.',
      "Some sea snakes can breathe through their skin.",
      "The heads on Easter Island have bodies.",
      "The moon has moonquakes.",
      "Humans are the only animals that blush.",
      "The wood frog can hold its pee for up to eight months.",
      "The feeling of getting lost inside a mall is known as the Gruen transfer.",
      "You lose up to 30 percent of your taste buds during flight.",
      "Cotton candy was invented by a dentist.",
      "Sharks can live for five centuries.",
      "The world wastes about 1 billion metric tons of food each year. Help reduce that number and stop wasting food :D",
    ];

    let TIP = Math.floor(Math.random() * tips.length);
    let Fact = tips[TIP];

    const author = message.author;

    let inline = true;

    const main = new MessageEmbed()
      .setTitle("Help Categories")
      .setDescription(
        "React to the respective emojis below. This message will edit when reacting to an emoji. **Please wait for me to add the reactions first, before reacting!**"
      )
      .setColor("#ffb6c1")
      .addField(
        "> :gear: Config",
        "The commands meant to modify the bot.",
        inline
      )
      .addField(
        "> :mag:  Information",
        "Pretty self-explanitory! This module is meant for information commands.",
        inline
      )
      .addField(
        `> ${emojis.categories.fun}  Fun`,
        "Commands in which you're sure to have fun!",
        inline
      )
      .addField(
        `> ${emojis.categories.giveaways}  Giveaways`,
        "Host giveaways with Hurricano™️!",
        inline
      )
      .addField(
        `> :camera:  Image Manipulation`,
        "Make funny images with Hurricano™️!",
        inline
      )
      .addField(
        `> ${emojis.categories.moderation}  Moderation`,
        "Let Hurricano™️ help the moderators and admins with its moderation system!",
        inline
      )
      .addField(
        "> :up:  Levelling",
        "Commands for Hurricano™️'s levelling module!",
        inline
      )
      .addField(
        `> ${emojis.categories.music}  Music`,
        "Feel like listening to some music? You can do it with Hurricano™️!",
        inline
      );

    client.config.ownerIds.includes(message.author.id)
      ? main.addField(
          `> ${emojis.categories.owner}  Owner`,
          "Commands meant for the bot owners.",
          inline
        )
      : main
          .addField(":bulb:  Fact:", `**${Fact}**`)
          .setFooter("Copyright Hurricano™");
    //-------------------------------------

    const config = new MessageEmbed()
      .setAuthor(
        "Configuration!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Config.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "The commands meant to modify the bot. **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.config.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Config.jpg"
      )
      .setFooter("Copyright Hurricano™");

    //--------------------------------------

    const information = new MessageEmbed()
      .setAuthor(
        "Information!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Information.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Pretty self-explanitory! This module is meant for information commands. **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.information.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Information.jpg"
      )
      .setFooter("Copyright Hurricano™");

    //---------------------------------------

    const fun = new MessageEmbed()
      .setAuthor(
        "Fun!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Fun.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Commands in which you're sure to have fun! **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.fun.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Fun.jpg"
      )
      .setFooter("Copyright Hurricano™");

    //-----------------------------------------
    const giveaways = new MessageEmbed()
      .setAuthor(
        "Giveaways!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Host giveaways with Hurricano™️! **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.giveaways.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg"
      )
      .setFooter("Copyright Hurricano™");
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const image = new MessageEmbed()
      .setAuthor(
        "Image Manipulation!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/ImageManip.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Make funny images with Hurricano™️! **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.image.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Image.jpg"
      )
      .setFooter("Copyright Hurricano™");
    // - - --- - - - - -- - - - - - - -- - - - - - -------------------------------------------------------
    const music = new MessageEmbed()
      .setAuthor(
        "Music!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Feel like listening to some music? You can do it with Hurricano™️!"
      )
      .addField("Commands", cmdmap.music.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Music.jpg"
      )
      .setFooter("Copyright Hurricano™");
    // -----------------------------------------------------------------------
    const levelling = new MessageEmbed()
      .setAuthor(
        "Levelling Commands!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Levelling.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Commands meant for the bot owners. **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.levelling.join(" "));

    const owner = new MessageEmbed()
      .setAuthor(
        "Bot Owner Commands!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/owner.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Commands meant for the bot owners. **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.owner.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Owner.jpg"
      )
      .setFooter("Copyright Hurricano™");
    // -------------------------------------------------------------------------------
    const moderation = new MessageEmbed()
      .setAuthor(
        "Moderation",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Moderation.png"
      )
      .setColor("#ffb6c1")
      .setDescription(
        "Moderation commands! **React** with other emojis to see what else there is!"
      )
      .addField("Commands", cmdmap.moderation.join(" "))
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Moderation.jpg"
      )
      .setFooter("Copyright Hurricano™");
    // ------------------------------------------------------------------------------------
    const emojimap = {
      ["giveaways"]: [
        emojis.categories.giveaways.split(":")[2].split("<")[0].split(">")[0],
      ],
      ["owner"]: [
        emojis.categories.owner.split(":")[2].split("<")[0].split(">")[0],
      ],
      ["music"]: [
        emojis.categories.music.split(":")[2].split("<")[0].split(">")[0],
      ],
      ["moderation"]: [
        emojis.categories.moderation.split(":")[2].split("<")[0].split(">")[0],
      ],
      ["config"]: "⚙️",
      ["information"]: "🔍",
      ["fun"]: "🎮",
      ["image"]: "📷",
      ["levelling"]: "🆙",
    };

    let helpMenu = new Menu(
      message.channel,
      message.author.id,
      [
        {
          name: "main",
          content: main,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "config",
          content: config,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "information",
          content: information,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "fun",
          content: fun,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "giveaways",
          content: giveaways,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "image",
          content: image,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "moderation",
          content: moderation,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.levelling]: "levelling",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "levelling",
          content: levelling,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.music]: "music",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "music",
          content: music,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.owner]: client.config.ownerIds.includes(message.author.id)
              ? "owner"
              : null,
          },
        },
        {
          name: "owner",
          content: owner,
          reactions: {
            [emojimap.config]: "config",
            [emojimap.information]: "information",
            [emojimap.fun]: "fun",
            [emojimap.giveaways]: "giveaways",
            [emojimap.music]: "music",
            [emojimap.image]: "image",
            [emojimap.moderation]: "moderation",
            [emojimap.levelling]: "levelling",
            [emojimap.levelling]: "levelling",
          },
        },
      ],
      30000
    );
    helpMenu.start();
  }
};
