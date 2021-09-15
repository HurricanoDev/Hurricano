import { MessageEmbed } from "discord.js";
async function sendMsg(message, type, sendType, values) {
    const error = type.toLowerCase() == "error" ? true : false;
    const embed = new MessageEmbed()
        .setAuthor(values.Header, error ? client.links.errorImage : client.links.successImage)
        .setColor(error ? "RED" : "GREEN")
        .setDescription(values.Msg)
        .setFooter(values.Footer ?? message.author.tag, message.author.displayAvatarURL());
    if (values.Fields)
        embed.addFields(values.Fields);
    const sendObj = {
        embeds: [embed],
    };
    sendObj.components = values.Components;
    return sendType === "edit"
        ? await message.edit({ embeds: [embed] })
        : await message.reply({ embeds: [embed] });
}
export const name = "Message";
export const extend = moduleExports.extend;
const moduleExports = {
    name,
    extend({ Message, bind }) {
        Object.defineProperties(Message, bind({
            editError: {
                value: async function editError(Header, Msg, Footer, Fields, Components) {
                    return await sendMsg(this, "error", "edit", {
                        Header,
                        Msg,
                        Footer,
                        Fields,
                        Components,
                    });
                },
            },
            editSuccess: {
                value: async function editSuccess(Header, Msg, Footer, Fields, Components) {
                    const msg = await sendMsg(this, "success", "edit", {
                        Header,
                        Msg,
                        Footer,
                        Fields,
                        Components,
                    });
                    return msg;
                },
            },
            say: {
                value: async function say(options) {
                    const msg = await this.channel.send(options);
                    return msg;
                },
            },
            sendErroReply: {
                value: async function sendErrorReply(Header, Msg, Footer, Fields, Components) {
                    const msg = await sendMsg(this, "error", "reply", {
                        Header,
                        Msg,
                        Footer,
                        Fields,
                        Components,
                    });
                    return msg;
                },
            },
            sendSuccessReply: {
                value: async function sendSuccessReply(Header, Msg, Footer, Fields, Components) {
                    const msg = await sendMsg(this, "success", "reply", {
                        Header,
                        Msg,
                        Footer,
                        Fields,
                        Components,
                    });
                    return msg;
                },
            },
        }, Message));
    }
};
export default moduleExports;
