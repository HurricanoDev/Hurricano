import GuildDatabaseActionsManager from "../internal/GuildDatabaseActionsManager.js";
export const name = "Guild";
export const extend = moduleExports.extend;
const moduleExports = {
    name,
    extend({ Guild }) {
        return class HurricanoGuild extends Guild {
            constructor(...args) {
                super(...args);
                this.db = new GuildDatabaseActionsManager({
                    client,
                    guildId: this.id,
                    guild: this,
                });
            }
        };
    }
};
export default moduleExports;
