const { APIMessage } = require("discord.js");
module.exports = {
  name: "INTERACTION_CREATE",
  run: async (interaction, client) => {
    const slashs = global.client.commands.filter((x) => x.slash);
    const cmd = slashs.get(interaction.data.name.toLowerCase());
    const createAPIMessage = async (interaction, content) => {
      const apiMessage = await APIMessage.create(
        global.client.channels.resolve(interaction.channel_id),
        content
      )
        .resolveData()
        .resolveFiles();
      return { ...apiMessage.data, files: apiMessage.files };
    };
    const quicksend = async (inter, content) => {
      return global.client.api
        .interactions(inter.id, inter.token)
        .callback.post({
          data: {
            type: 4,
            data: await createAPIMessage(inter, content),
          },
        });
    };
    if (cmd)
      cmd.run(
        interaction,
        interaction.data.options,
        createAPIMessage,
        quicksend
      );
  },
};
