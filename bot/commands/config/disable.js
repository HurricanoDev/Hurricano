const Command = require('@Command'),
  { MessageSelectMenu } = require('discord.js');

module.exports = new Command({
  name: 'disable',
  descripton: 'Disable a module.',
  userPermissions: ['ADMINISTRATOR'],
  async run(message) {
    const embed = await message.channel.sendSuccess('Available Modules:');
  },
});
