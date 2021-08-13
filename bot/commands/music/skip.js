const { MessageEmbed } = require('discord.js');
const Command = require('@Command');
module.exports = new Command({
  name: 'skip',
  aliases: ['sk'],
  cooldown: 20,
  async run(message, args) {
    if (!message.member.voice.channel)
      if (!message.member.voice.channel)
        return message.channel.sendError(
          message,
          'Not in A Voice Channel.',
          'Please join a voice channel to play music.',
        );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.sendError(
        message,
        'Different Voice Channel.',
        'Please join the same voice channel as me.',
      );
    const queue = client.player.getQueue(message.guild);
    let tracks = queue.tracks;
    if (!queue)
      return message.channel.sendError(
        message,
        'No Music is Playing.',
        'Please join a voice channel to play music.',
      );

    let skipTrack = queue.nowPlaying();
    tracks.push(skipTrack);
    if (args.length) {
      if (!+args[0])
        return message.channel.sendError(
          message,
          'Invalid Arguments.',
          'Please provide the number of the song you would like to skip.',
        );
      if (+args[0] <= 0)
        return message.channel.sendError(
          message,
          'Invalid Arguments.',
          'Please provide a positive number.',
        );
      if (+args[0] > tracks.length)
        return message.channel.sendError(
          message,
          'Invalid Arguments.',
          "Please provide a number that isn't greater than the number of songs in the queue.",
        );
      skipTrack = tracks[+args[0] - 1];
    }

    queue.skip(skipTrack);

    message.channel.sendSuccess(
      message,
      'Skipped.',
      'I have successfully skipped that song.',
    );
  },
});
