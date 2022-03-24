import { Collection } from "@discordjs/collection";
import type { HurricanoClient } from "./HurricanoClient.mjs";
import { CollectionBasedManagerOptions } from "../types/index.mjs";

export type CollectionObject<T> = { [key: string]: T };

export class CollectionBasedManager<T> extends Collection<string, T> {
	public client: HurricanoClient;

	constructor({ client, data = [] }: CollectionBasedManagerOptions<T>) {
		super(data);

		this.client = client;
	}
	toObject(): CollectionObject<T> {
		const obj: CollectionObject<T> = {};

		for (const [key, value] of this.entries()) obj[key] = value;

		return obj;
	}
}
