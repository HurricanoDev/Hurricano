const Discord = require("discord.js");
const Command = require("@Command");
const { APIMessage } = require('discord.js');

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      description: "Returns the bot's ping!",
      slash: true,
      options: [
		{
			name: "Text",
			description: "What you want the bot to say.",
			type: 3,
			required: true,
		},
	]
    });
  }
  
  async run(message, args) {
      client.api
            .interactions(message.id, message.token)
            .callback.post({
                data: {
                    type: 4,
                    data: {
                        content: args[0].value
                    },
                },
            });
    
    

  }
};
