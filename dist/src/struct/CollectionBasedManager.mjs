import { Collection } from "@discordjs/collection";
export class CollectionBasedManager extends Collection {
    client;
    constructor({ client, data = [] }) {
        super(data);
        this.client = client;
    }
    toObject() {
        const obj = {};
        for (const [key, value] of this.entries())
            obj[key] = value;
        return obj;
    }
}
