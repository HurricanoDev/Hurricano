import { Client } from "discord.js";
import { CollectionBasedManager } from "./CollectionBasedManager";

export class HurricanoClient extends Client {
	public commands = CollectionBasedManager;

	constructor() {
		super({ intents: 42 });
	}
}
