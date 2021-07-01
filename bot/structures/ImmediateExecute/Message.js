const { Structures, MessagePayload, MessageEmbed } = require("discord.js");
async function sendMsg(message, type, sendType, values) {
  const error = type.toLowerCase() == "error" ? true : false;
  const embed = new MessageEmbed()
    .setAuthor(
      values.Header,
      error ? client.links.errorImage : client.links.successImage
    )
    .setColor(error ? "RED" : "GREEN")
    .setDescription(values.Msg)
    .setFooter(
      values.Footer ?? message.author.tag,
      message.author.displayAvatarURL()
    );
  if (values.Fields) embed.addFields(values.Fields);
  const sendObj = {
    embeds: [embed],
  };
  sendObj.components = values.Components;
  return sendType === "edit"
    ? await message.reply({ embeds: [embed] })
    : await message.edit({ embeds: [embed] });
}
module.exports = Structures.extend(
  "Message",
  (Message) =>
    class HurricanoMessage extends Message {
      constructor(...args) {
        super(...args);
      }
      async editError(Header, Msg, Footer, Fields, Components) {
        const msg = await sendMsg(this, "error", "edit", {
          Header,
          Msg,
          Footer,
          Fields,
          Components,
        });
        return msg;
      }
      async editSuccess(Header, Msg, Footer, Fields, Components) {
        const msg = await sendMsg(this, "success", "edit", {
          Header,
          Msg,
          Footer,
          Fields,
          Components,
        });
        return msg;
      }
      async say(options) {
        const msg = await this.channel.send(options);
        return msg;
      }
      async sendErrorReply(Header, Msg, Footer, Fields, Components) {
        const msg = await sendMsg(this, "error", "reply", {
          Header,
          Msg,
          Footer,
          Fields,
          Components,
        });
        return msg;
      }
      async sendSuccessReply(Header, Msg, Footer, Fields) {
        const msg = await sendMsg(this, "success", "reply", {
          Header,
          Msg,
          Footer,
          Fields,
          Components,
        });
        return msg;
      }
    }
);
