const { MessageEmbed } = require("discord.js");
const { Menu } = require("../../utilities/ReactionMenu.js");
const emojis = require("../../utilities/emojis.json");
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

const Command = require("@Command");
module.exports = new Command({
  name: "help",
  description:
    "Shows the commands list and also specific command categories/commands!",
  aliases: ["cmd", "commands", "h"],
  async run(message, args) {
    let TIP = Math.floor(Math.random() * tips.length);
    let Fact = tips[TIP];
    const author = message.author;
    let inline = true;
    const pref = await message.client.db.guild.getPrefix(message.guild.id);
    if (args.length) {
      const cmd =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));
      if (!cmd)
        return message.sendErrorReply(
          "Invalid Command Provided.",
          "I could not find the command you provided.",
          "Provide a valid command next time, smh."
        );
      const emb = new MessageEmbed()
        .setTitle(`Command Help: ${cmd.name}`)
        .setAuthor(
          message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(cmd.description)
        .addField("Category", `\`${cmd.category}\``, true);
      emb.setThumbnail(this.client.user.avatarURL());
      if (typeof cmd.usage == "array")
        emb.addField("Usage", `\`${pref}${cmd.usage}\``, true);
      else emb.addField("Usage", "No usage provided.", true);
      if (typeof cmd.aliases == "array")
        emb.addField(
          "Aliases",
          cmd.aliases.map((alias) => `\`${pref}${alias}\``).join(" "),
          true
        );
      else emb.addField("Aliases", "No aliases provided.", true);
      if (typeof cmd.examples == "array")
        emb.addField(
          "Examples",
          cmd.examples.map((ex) => `\`${pref}${ex}\``).join("\n"),
          true
        );
      else emb.addField("Examples", "No examples provided.", true);
      emb.setFooter("Copyright Hurricano™");
      if (cmd.slash) emb.addField("Slash", "Yes.", true);
      else emb.addField("Slash", "No.", true);
      if (cmd.double) emb.addField("Both Slash And Normal?", "Yes.", true);
      else emb.addField("Both Slash And Normal?", "No.", true);
      message.channel.send(emb);
    } else {
      let cmdmap = {};
      client.commands.forEach((command) => {
        if (!cmdmap[command.category]) cmdmap[command.category] = [];
        if (command.slash.isSlash && !command.slash.isNormal)
          cmdmap[command.category].push(
            `\`[Slash Command] ${command.name}\`, `
          );
        if (!command.slash.isSlash)
          cmdmap[command.category].push(`\`${command.name}\`, `);
        if (command.slash.isSlash && command.slash.isNormal)
          cmdmap[command.category].push(
            `\`[Slash And Normal Command] ${command.name}\`, `
          );
      });
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
        )
        .addField(
          `> 🛠️  Utility`,
          "Want some handy tools? Well, here you go!",
          inline
        );

      client.config.ownerIds.includes(message.author.id)
        ? main.addField(
            `> ${emojis.categories.owner}  Owner`,
            "Commands meant for the bot owners.",
            inline
          )
        : null;

      main
        .addField(":bulb:  Fact:", `**${Fact}**`)
        .setFooter("Copyright Hurricano™");
      //-------------------------------------
      function generateHelpEmbed(
        AuthorName,
        AuthorURL,
        description,
        CategoryCommands,
        Image
      ) {
        let emb = new MessageEmbed()
          .setAuthor(AuthorName, AuthorURL)
          .setDescription(description)
          .addField("Commands", CategoryCommands.join(" "))
          .setColor("#ffb6c1")
          .setImage(Image)
          .setFooter("Copyright Hurricano™");
        return emb;
      }
      const config = generateHelpEmbed(
        "Configuration!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Config.png",
        "The commands meant to modify the bot. **React** with other emojis to see what else there is!",
        cmdmap.config,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Config.jpg"
      );
      const information = generateHelpEmbed(
        "Information!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Information.png",
        "Pretty self-explanitory! This module is meant for information commands. **React** with other emojis to see what else there is!",
        cmdmap.information,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Information.jpg"
      );

      const fun = generateHelpEmbed(
        "Fun!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Fun.png",
        "Commands in which you're sure to have fun! **React** with other emojis to see what else there is!",
        cmdmap.fun,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Fun.jpg"
      );
      //-----------------------------------------
      const giveaways = generateHelpEmbed(
        "Giveaways!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif",
        "Host giveaways with Hurricano™️! **React** with other emojis to see what else there is",
        cmdmap.giveaways,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg"
      );
      const image = generateHelpEmbed(
        "Image Manipulation!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/ImageManip.png",
        "Make funny images with Hurricano™️! **React** with other emojis to see what else there is!",
        cmdmap.image,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Image.jpg"
      ); // - - --- - - - - -- - - - - - - -- - - - - - -------------------------------------------------------
      const music = generateHelpEmbed(
        "Music!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif",
        "Feel like listening to some music? You can do it with Hurricano™️!",
        cmdmap.music,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Music.jpg"
      );
      const levelling = generateHelpEmbed(
        "Levelling Commands!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Levelling.png",
        "Commands meant for the bot owners. **React** with other emojis to see what else there is!",
        cmdmap.levelling,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Levelling.jpg"
      );
      const owner = generateHelpEmbed(
        "Bot Owner Commands!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/owner.png",
        "Commands meant for the bot owners. **React** with other emojis to see what else there is!",
        cmdmap.owner,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Owner.jpg"
      );
      // -------------------------------------------------------------------------------
      const moderation = generateHelpEmbed(
        "Moderation",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Moderation.png",
        "Moderation commands! **React** with other emojis to see what else there is!",
        cmdmap.moderation,
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Moderation.jpg"
      );
      // ------------------------------------------------------------------------------------
      const utility = generateHelpEmbed(
        "Utility",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Utility.png",
        "Utility commands! **React** with other emojis to see what else there is!",
        cmdmap.utility,
        "https://github.com/HurricanoBot/HurricanoImages/blob/master/categories/Utility.jpg"
      );
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
          emojis.categories.moderation
            .split(":")[2]
            .split("<")[0]
            .split(">")[0],
        ],
        ["config"]: "⚙️",
        ["information"]: emojis.categories.information
          .split(":")[2]
          .split("<")[0]
          .split(">")[0],
        ["fun"]: "🎮",
        ["image"]: "📷",
        ["levelling"]: "🆙",
        ["utility"]: "🛠️",
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
                ? "owner"
                : null,
            },
          },
          {
            name: "utility",
            content: utility,
            reactions: {
              [emojimap.config]: "config",
              [emojimap.information]: "information",
              [emojimap.fun]: "fun",
              [emojimap.giveaways]: "giveaways",
              [emojimap.music]: "music",
              [emojimap.image]: "image",
              [emojimap.moderation]: "moderation",
              [emojimap.levelling]: "levelling",
              [emojimap.owner]: client.config.ownerIds.includes(
                message.author.id
              )
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
              [emojimap.utility]: "utility",
              [emojimap.levelling]: "levelling",
            },
          },
        ],
        30000
      );
      helpMenu.start();
    }
  },
});
