// eslint-disable-next-line no-unused-vars
const { HurricanoClient } = require("./Client.js"),
// eslint-disable-next-line no-unused-vars
  { Message, CommandInteraction, MessageEmbed } = require("discord.js");
/**
 * Manager for all custom client functions.
 */

module.exports = class ClientFunctionsManager {
  /**
   * Initializes the class.
   * @param {HurricanoClient} client
   */

  constructor(client) {
    /**
     * Hurricano's client.
     * @type {HurricanoClient}
     */

    this.client = client;
  }
  createOptionsEmbed (command, message) {
    const optionsEmbed = new MessageEmbed()
      .setAuthor(`${command.name} Help`, this.user.displayAvatarURL())
      .setColor("#606365")
      .addField(
        "Usage:",
        `${`\`${command.usage}\`` ?? "No usage provided."}`,
      )
      .addField(
        "Permissions",
        command.userPermissions?.length
          ? command.userPermissions.map((x) => `\`${x}\``).join(", ")
          : "No user permissions required.",
      )
      .addField("Subcommands:", `${options}`)
      .setFooter(
        `Type ${message._usedPrefix}help <command> for more info on a command.`,
      );

    return optionsEmbed;
  }
  async getMember (returnAuthor, message, ...args) {
    if (!returnAuthor && returnAuthor !== false)
      throw new Error("Returning message.author not specified.");
    if (!message) throw new Error("Message object not provided.");
    if (!args.length) throw new Error("Arguments string not provided.");
    if (typeof returnAuthor !== "boolean")
      throw new Error(
        "Whether to return author or not option is not boolean.",
      );
    if (typeof message !== "object")
      throw new Error("Message provided is not an object.");
    args = args[0];
    let user;
    if (message.mentions?.members.first())
      user = message.mentions.members.first();
    else user = await message.guild.members.fetch(args).catch(() => {});
    if (user && user.size) user = null;

    if (returnAuthor && !user) return message.member;
    if (user) return user;
    if (!user) return null;
  }
  async getChannel (returnChannel, message, ...args) {
    if (!returnChannel && returnChannel !== false)
      throw new Error(`Returning message.author not specified.`);
    if (!message) throw new Error(`Message object not provided.`);
    if (!args.length) throw new Error(`Arguments string not provided.`);
    if (typeof returnChannel !== "boolean")
      throw new Error(
        `Whether to return channel or not option is not boolean.`,
      );
    if (typeof message !== "object")
      throw new Error(`Message provided is not an object.`);
    args = args[0];
    let user;
    if (message.mentions?.channels.first())
      user =
        message.mentions?.channels.first() ||
        message.guild.channels.cache.find((x) => x.name === args);
    else user = message.guild.channels.cache.get(args);
    if (returnChannel && !user) return message.channel;
    if (user) return user;
    if (!user) return null;
  }
  async createUserDB(user) {
    const data = await new this.client.schemas.user({
      name: user.name,
      id: user.id,
    }).save();
    return data;
  }
  getOrdinalSuffix (i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }
  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  shuffle (content) {
    var a = content.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  }
  
  hasNumber (number) {
    return /\d/.test(number);
  }
  randomInArray (array) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray;
  }
};
