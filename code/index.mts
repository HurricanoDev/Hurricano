import { HurricanoClient } from "#struct";
import Config from "#config";

const client = new HurricanoClient({ config: Config });

async function init() {
	await client.commands.loadAll();
}
