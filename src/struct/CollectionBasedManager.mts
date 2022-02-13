import { Collection } from "discord.js";
import type { HurricanoClient } from "./HurricanoClient.mjs";
import { CollectionBasedManagerOptions } from "../types/index.mjs";

export class CollectionBasedManager<DataType> extends Collection<
	string,
	DataType
> {
	public client: HurricanoClient;

	constructor({
		client,
		data = [],
	}: CollectionBasedManagerOptions<DataType>) {
		super(data);

		this.client = client;
	}
	toObject(): Record<string, DataType> {
		const obj: Record<string, DataType> = {};

		for (const [key, value] of this.entries()) obj[key] = value;

		return obj;
	}
}
