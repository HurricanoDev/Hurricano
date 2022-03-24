import { ErisExtension } from "#struct";
export default new ErisExtension("Message", ({ define }) => define({
    guild() {
        return this.channel.guild ?? null;
    },
}, {
    guild: {
        get: true,
    },
}));
