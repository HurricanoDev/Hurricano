import { User, Role, AnyChannel, Member, Guild, Message, Client } from "eris";
import { Collection } from "@discordjs/collection";

export class Mentions {
	public client: Client;
	public message: Message;
	public guild?: Guild;
	public users: Collection<string, User> = new Collection();
	public roles: Collection<string, Role> = new Collection();
	public channels: Collection<string, AnyChannel> = new Collection();
	public members: Collection<string, Member> = new Collection();

	constructor({
		client,
		message,
		guild,
	}: {
		client: Client;
		message: Message;
		guild?: Guild;
	}) {
		this.client = client;
		this.message = message;
		this.guild = guild;

		for (const user of message.mentions) this.users.set(user.id, user);
		for (const roleID of message.roleMentions)
			this.roles.set(roleID, guild!.roles.get(roleID)!);
		for (const channelID of message.channelMentions)
			this.channels.set(
				channelID,
				guild
					? guild!.channels.get(channelID)!
					: client.getChannel(channelID),
			);
	}
}
