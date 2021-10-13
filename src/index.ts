import { HurricanoClient } from "./src/struct/HurricanoClient";

const client = new HurricanoClient({ intents: 32767 });

client.login("s");
