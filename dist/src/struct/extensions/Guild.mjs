import { ErisExtension } from "../ErisExtension.mjs";
import { StructureError } from "../StructureError.mjs";
export default new ErisExtension("Guild", ({ define }) => define({
    async getRESTChannel(id) {
        const channel = this.client.getChannel(id);
        if (!channel)
            throw new StructureError({
                type: 4,
            });
        if (channel.guild.id !== this.id)
            throw new StructureError({
                type: 3,
            });
        return channel;
    },
}));
