import { Collection } from "discord.js";
import type { HurricanoClient } from "./HurricanoClient";

export class CollectionBasedManager extends Collection<string, {}> {
	public client: HurricanoClient;
	constructor({
		client,
		data,
	}: {
		client: HurricanoClient;
		data: Iterable<[string, {}]>;
	}) {
		super(data);

		this.client = client;
	}
}
