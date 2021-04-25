const { Structures } = require("discord.js");
module.exports = Structures.extend("Guild", (Guild) => {
  class HurricanoGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      console.log(data);
    }
  }
  return HurricanoGuild;
});
