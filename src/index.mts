import { HurricanoClient } from "./src/struct/index.mjs";
import Config from "./config.mjs";

const client = new HurricanoClient({ config: Config });

client.login("s");
