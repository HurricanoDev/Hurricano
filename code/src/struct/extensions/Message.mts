import { ErisExtension } from "#struct";

export default new ErisExtension<"Message">("Message", ({ define }) =>
	define(
		{
			guild() {
				return this.channel.guild ?? null;
			},
		},
		{
			guild: {
				get: true,
			},
		},
	),
);
