const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = class FiltersCommand extends Command {
  constructor(client) {
    super(client, {
      name: "filters",
      aliases: ["filter"],
      args: `Please provide which filter you would like to use!`,
    });
  }
  async run(message, args) {
    if (!message.member.voice.channel)
      return message.channel.sendError(
        message,
        "Not in A Voice Channel.",
        "Please join a voice channel to play music."
      );

    if (!message.client.player.getQueue(message))
      return message.channel.sendError(
        message,
        "No Music is Playing.",
        "Please play some music to play filters."
      );

    const filterToUpdate = message.client.filters.find(
      (x) => x.toLowerCase() === args[0].toLowerCase()
    );

    if (!filterToUpdate)
      return message.channel.sendError(
        message,
        "Invalid Filter",
        "This filter doesn't exist. Filters you can use are: \n 8D \n gate \n haas \n phaser \n treble \n tremolo \n vibrato \n reverse \n karaoke \n flanger \n mcompand \n pulsator \n subboost \n bassboost \n vaporwave \n nightcore \n normalizer \n surrounding"
      );

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = message.client.player.getQueue(message)
      .filters[filterToUpdate]
      ? false
      : true;

    message.client.player.setFilters(message, filtersUpdated);
    if (filtersUpdated[filterToUpdate])
      message.channel.sendSuccess(
        message,
        "Filter Being Added.",
        "I am adding the filter the the song. Please wait. The longer the song is, the longer it takes."
      );
    else
      message.channel.sendSuccess(
        message,
        "Filter Being Removed.",
        "I am removing the filters. Please wait. The longer the song is, the longer this will take."
      );
  }
};
