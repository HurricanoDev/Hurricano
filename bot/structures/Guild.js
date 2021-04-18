const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
  class HurricanoGuild extends Guild {
    constructor(client, data) {
        super(client, data);
        console.log(data)
    }
  }
  return HurricanoGuild;
});