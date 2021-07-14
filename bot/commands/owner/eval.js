const Discord = require("discord.js");
const sourcebin = require("../../utilities/SourcebinPost.js");
const config = require("@config");
const Command = require("@Command");
const { MessageEmbed, MessageButton } = require("discord.js");
module.exports = new Command({
  name: "eval",
  description: "Evaluates arbituary JavaScript.",
  ownerOnly: true,
  args: "Please provide what you would like to eval!",
  async run(message, args) {
    async function sendEmbed(content, input, typeofOut) {
      const toEval = input;
      let embed = new MessageEmbed()
        .setTitle("Eval Output.")
        .setAuthor(
          `Eval by ${message.author.username}.`,
          message.author.displayAvatarURL()
        )
        .addField(
          "Input:",
          `\`\`\`js\n${
            toEval.length > 1016
              ? "Input is larger than 1016 characters."
              : toEval
          }\`\`\``,
          true
        )
        .addField("Type of Output:", `\`\`\`xl\n${typeofOut}\`\`\``);
      if (content.length > 2032) {
        const src = await sourcebin(
          [
            {
              name: `Code by ${message.author.tag}`,
              content: content,
              languageId: "js",
            },
          ],
          {
            title: `Code by ${message.author.tag}`,
            description: `Output of the eval command used by ${message.author.tag}.`,
          }
        ).catch((e) => {
          return e;
        });
        const msg = await message.author.sendSuccess(
          message,
          "Eval Output.",
          `The output for the eval command was larger than 2032 characters. To check it, click [here](${src.url}) or use the link: ${src.url}.`
        );
        embed.setDescription(
          `**Output** \n Output is too large! Check your DMs, or click [here](${msg.url}).`
        );
        return embed;
      } else {
        embed.setDescription(`**Output**\n \`\`\`js\n${content}\n\`\`\``);
        return embed;
      }
    }
    const types = ["async", "sync"];
    const pref = message._usedPrefix;
    if (!types.includes(args[0]))
      return message.channel.sendError(
        message,
        "Invalid Arguments Provided!",
        `Please provide if you would like to eval in \`sync, or async\`. \n Examples: \`${pref}eval sync <code>\`, \n \`${pref}eval async <code>\`.`
      );
    let code = args.map((x) => x);
    code.shift();
    code = code.join(" ");
    try {
      if (!code)
        return message.channel.sendError(
          message,
          "Invalid Arguments Provided!",
          "Please provide what you would like to eval!"
        );
      let evaled;
      args[0] === "sync"
        ? (evaled = eval(code))
        : (evaled = await eval(`(async () => {
        ${code}
      })()`));
      const type = typeof evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 4 });
      if (evaled.includes(config.token) || evaled.includes(config.mongouri))
        return message.channel.sendError(
          message,
          "Eval Error.",
          "This eval has the bot credentials! Please try without using the bot's credentials."
        );

      const embed = await sendEmbed(evaled, code, type);
      const row = new MessageButton()
        .setCustomID("toDelete")
        .setLabel("Delete?")
        .setStyle("DANGER");
      const msg = await message.channel.send({
        embeds: [embed],
        components: [[row]],
      });
      let conf = await msg
        .awaitMessageComponentInteraction({
          time: 45000,
          filter: (x) =>
            client.config.ownerIds.includes(x.user.id) &&
            x.customID == "toDelete",
        })
        .catch(() => {
          msg.edit({ components: [] });
        });
      if (conf?.customID) {
        conf.reply({ content: "Successfully deleted!", ephemeral: true });
        msg.delete();
      }
    } catch (err) {
      const type = typeof err;
      const embed = await sendEmbed(err, code, type);
      const row = new MessageButton()
        .setCustomID("toDelete")
        .setLabel("Delete?")
        .setStyle("DANGER");
      const msg = await message.channel.send({
        embeds: [embed],
        components: [[row]],
      });
      let conf = await msg
        .awaitMessageComponentInteraction({
          time: 45000,
          filter: (x) =>
            client.config.ownerIds.includes(x.user.id) &&
            x.customID == "toDelete",
        })
        .catch(() => {
          msg.edit({ components: [] });
        });
      if (conf?.customID) {
        conf.reply({ content: "Successfully deleted!", ephemeral: true });
        msg.delete();
      }
    }
  },
});
