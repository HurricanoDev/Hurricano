import BaseEvent from "../../structures/internal/BaseEvent.js";
export default (class DebugEvent extends BaseEvent {
    constructor(client) {
        super("debug", {
            description: "The debug event, to log extra info.",
            client,
        });
    }
    run(info) {
        if (!info.toLowerCase().includes("voice"))
            return client.logger.info(info);
    }
});
