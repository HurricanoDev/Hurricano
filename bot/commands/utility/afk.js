const Command = require('@Command');

module.exports = new Command({
  name: 'afk',
  description: 'Set your afk!',
  slash: false,
  async run(message, args) {
    const reason = args.join(' ') || 'No reason provided.';

    client.afk.set(message.author.id, [Date.now(), reason]);

    message.reply(`You are now AFK!\nReason: ${reason}`);
  },
});
