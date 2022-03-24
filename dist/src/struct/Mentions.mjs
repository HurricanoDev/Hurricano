import { Collection } from "@discordjs/collection";
export class Mentions {
    client;
    message;
    guild;
    users = new Collection();
    roles = new Collection();
    channels = new Collection();
    members = new Collection();
    constructor({ client, message, guild, }) {
        this.client = client;
        this.message = message;
        this.guild = guild;
        for (const user of message.mentions)
            this.users.set(user.id, user);
        for (const roleID of message.roleMentions)
            this.roles.set(roleID, guild.roles.get(roleID));
        for (const channelID of message.channelMentions)
            this.channels.set(channelID, guild
                ? guild.channels.get(channelID)
                : client.getChannel(channelID));
    }
}
