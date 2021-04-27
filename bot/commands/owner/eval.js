const Discord = require("discord.js");
const sourcebin = require("sourcebin");
const config = require("@config");
const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
module.exports = new Command({
  name: "eval",
  description: "Evaluates arbituary JavaScript.",
  ownerOnly: true,
  args: "Please provide what you would like to eval!",
  async run(message, args) {
    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    const types = ['async', 'sync'];
    const pref = await client.db.guild.getPrefix(message.guild.id);
    if (!types.includes(args[0])) return message.channel.sendError(message, 'Invalid Arguments Provided!', `Please provide if you would like to eval in \`sync, or async\`. \n Examples: \`${pref}eval sync <code>\`, \n \`${pref}eval async <code>\`.`)
    try {
      const code = args.join(" ").replace(args[0], '');
      if (!code) return message.channel.sendError(message, 'Invalid Arguments Provided!', 'Please provide what you would like to eval!');
      let evaled;
      args[0] === 'sync' ? evaled = eval(code) : evaled = await eval(`(async () => {
        ${code}
      })()`)
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 4 });
      if (evaled.includes(config.token) || evaled.includes(config.mongouri)) {
        message.channel.send({
          embed: {
            title: "Eval Error.",
            description:
              "This eval has the bot credentials! Please try without using the bot's credentials.",
          },
        });
        return;
      }
      if (clean(evaled).length > 2032) {
        await sourcebin
          .create(
            [
              {
                content: clean(evaled),
                language: "javascript",
              },
            ],
            {
              name: `Code by ${message.author.tag}`,
              description: `Output of the eval command used by ${message.author.tag}.`,
            }
          )
          .then(async (src) => {
            const msg = await message.author.send(
              new MessageEmbed()
                .setTitle("Eval Output.")
                .setDescription(
                  `The output of the code you evaluated is larger than 2032 characters. To view it, [click here](${src.url}).`
                )
            );
            var embed = new Discord.MessageEmbed()
              .addField(
                "Input",
                `\`\`\`js\n${
                  code.length > 1016
                    ? "Input is larger than 1016 characters."
                    : code
                }\`\`\``,
                true
              )
              .setColor("#ffb6c1")
              .setTitle("Eval Output.")
              .setDescription(
                `**Output** \n Output is too large! Check your DMs, or click [here](${msg.url}).`
              );
            await message.reply({ embed: embed });
          })
          .catch(async (e) => {
            await message.reply(`Error: ${e}`);
          });
      } else {
        var embed2 = new Discord.MessageEmbed()
          .addField(
            "Input",
            `\`\`\`js\n${
              code.length > 1016
                ? "Input is larger than 1016 characters."
                : code
            }\`\`\``,
            true
          )
          .setColor("#ffb6c1")
          .setDescription(`**Output**\n \`\`\`js\n${clean(evaled)}\n\`\`\``);
        await message.reply({ embed: embed2 });
      }
    } catch (err) {
      const code = args.join(" ").replace(args[0], '');
      if (!code) return message.channel.sendError(message, 'Invalid Arguments Provided!', 'Please provide what you would like to eval!');

      if (clean(err).length > 2032) {
        sourcebin
          .create(
            [
              {
                content: clean(evaled),
                language: "javascript",
              },
            ],
            {
              name: `Code by ${message.author.tag}`,
              description: `Output of the eval command used by ${message.author.tag}.`,
            }
          )
          .then(async (src) => {
            const msg = await message.author.send(
              new MessageEmbed()
                .setTitle("Eval Output.")
                .setDescription(
                  `The output of the code you evaluated is larger than 2032 characters. To view it, [click here](${src.url}).`
                )
            );
            var embed = new Discord.MessageEmbed()
              .addField(
                "Input",
                `\`\`\`js\n${
                  code.length > 1016
                    ? "Input is larger than 1016 characters."
                    : code
                }\`\`\``,
                true
              )
              .setColor("#ffb6c1")
              .setTitle("Output: :outbox_tray:")
              .setDescription(
                `**Output** \n Output is too large! Check your DMs, or click [here](${msg.url}).`
              );
            await message.reply({ embed: embed });
          });
      }
      var embed3 = new Discord.MessageEmbed()
        .addField(
          "Input",
          `\`\`\`js\n${
            code.length > 1016 ? "Input is larger than 1016 characters." : code
          }\`\`\``,
          true
        )
        .setColor("#ffb6c1")
        .setTitle("Output: :outbox_tray:")
        .setDescription(`**Output**\n \`\`\`js\n${clean(err)}\n\`\`\``);
      await message.reply({ embed: embed3 });
    }
  },
});
