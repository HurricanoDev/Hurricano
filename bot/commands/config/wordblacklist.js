const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const { blacklistedWords } = require("../../collections/blwords.js");

module.exports = new Command({
  name: "wordblacklist",
  description: "Blacklist/Display/Remove word(s) in your server.",
  aliases: ["wbl"],
  userPermissions: ["ADMINISTRATOR"],
  examples: [
    "wordblacklist display",
    "wordblacklist add",
    "wordblacklist remove",
  ],
  subCommands: {
    commands: [
      [
        "add",
        async () => {
          const word = args[1]?.toLowerCase();
          if (!word)
            return message.channel.sendError(
              message,
              "Error!",
              "Please specify a word to blacklist"
            );

          client.schemas.guild.findOne(
            { id: message.guild.id },
            async (err, data) => {
              if (data) {
                if (data.blacklistedWords.includes(word)) {
                  return message.sendErrorReply(
                    "Error!",
                    "That word is already blacklisted!"
                  );
                }
                data.blacklistedWords.push(word);
                data.save();
                blacklistedWords.get(message.guild.id).push(word);
              }
              message.channel.sendSuccess(
                message,
                "Done!",
                `The word: \`${word}\` was blacklisted!`
              );
            }
          );
        },
      ],
      [
        ["remove", "delete"],
        async () => {
          const word = args[1]?.toLowerCase();
          if (!word)
            return message.channel.sendError(
              message,
              "Error!",
              "Please specify a word to blacklist"
            );

          client.schemas.guild.findOne(
            { id: message.guild.id },
            async (err, data) => {
              if (!data)
                return message.channel.sendError(
                  message,
                  "Error!",
                  "There is no data saved in the database!"
                );

              if (!data.blacklistedWords.includes(word))
                return message.channel.sendError(
                  message,
                  "Error!",
                  "That word does not exist in the database."
                );

              const filtered = data.blacklistedWords.filter(
                (target) => target !== word
              );

              await client.schemas.guild.findOneAndUpdate(
                { id: message.guild.id },
                {
                  blacklistedWords: words,
                }
              );

              blacklistedWords
                .get(message.guild.id)
                .filter((target) => target !== word);
            }
          );
          message.channel.sendSuccess(
            message,
            "Done!",
            "That word has been removed"
          );
        },
      ],
      [
        "display",
        async () => {
          client.schemas.guild.findOne(
            { id: message.guild.id },
            async (err, data) => {
              if (!data)
                return message.channel.sendError(
                  message,
                  "Error!",
                  "There is no data to display!"
                );

              const displayEmbed = new MessageEmbed()
                .setTitle("Blacklisted Words")
                .setColor("#606365")
                .setDescription(data.blacklistedWords.join(", "));
              message.channel.send({ embeds: [displayEmbed] });
            }
          );
        },
      ],
    ],
  },
  args: "Incomplete arguments Provided. \n Possible subcommands: `add, remove, display`",
});
