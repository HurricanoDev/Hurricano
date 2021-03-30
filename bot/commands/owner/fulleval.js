const Discord = require("discord.js");
const sourcebin = require("sourcebin");
const config = require("@config");
const Command = require("@Command");
module.exports = class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: "fulleval",
      description: "Evaluates arbituary JavaScript, with no restrictions.",
      ownerOnly: true,
      args: "Please provide what you'd like to eval!"
    });
  }
  async run(message, args) {
    const clean = (text) => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 4 });
      if (clean(evaled).length > 2048 || code.length > 2048) {
        await sourcebin
          .create(
            [
              {
                content: clean(evaled),
                language: "js",
              },
            ],
            {
              name: `Code by ${message.author.tag}`,
              description: `Output of the eval command used by ${message.author.tag}.`,
            }
          )
          .then(async (src) => {
            var embed = new Discord.MessageEmbed()
              .setColor("#ffb6c1")
              .setTitle("Output: :outbox_tray:")
              .setDescription(`Output is too large! [Click here.](${src.url})`);
            await message.reply({ embed: embed });
          })
          .catch(async (e) => {
            await message.reply(`Error: ${e}`);
          });
      } else {
        var embed2 = new Discord.MessageEmbed()
          .setColor("#ffb6c1")
          .setTitle("Output: :outbox_tray:")
          .setDescription(`\`\`\`js\n${clean(evaled)}\n\`\`\``);
        await message.reply({ embed: embed2 });
      }
    } catch (err) {
      const code = args.join(" ");
      if (clean(err).length > 1024 || code.length > 1024) {
        sourcebin
          .create(
            [
              {
                content: clean(evaled),
                language: "js",
              },
            ],
            {
              name: `Code by ${message.author.tag}`,
              description: `Output of the eval command used by ${message.author.tag}.`,
            }
          )
          .then(async (src) => {
            var embed = new Discord.MessageEmbed()
              .setColor("#ffb6c1")
              .setTitle("Output: :outbox_tray:")
              .setDescription(`Output is to large! [Click here.](${src.url})`);
            await message.reply({ embed: embed });
          });
      }
      var embed3 = new Discord.MessageEmbed()
        .setColor("#ffb6c1")
        .setTitle("Output: :outbox_tray:")
        .setDescription(`\`\`\`js\n${clean(err)}\n\`\`\``);
      await message.reply({ embed: embed3 });
    }
  }
};
