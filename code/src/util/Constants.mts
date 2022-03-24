/* eslint-disable quotes */

export default {
	Errors: {
		Command: {
			CUSTOM: null,
			WRONG_PARAMETER_TYPE:
				'An invalid type was provided for property "${name}". Expected "${Util.getType(expected)}", but received "${Util.getType(received)}".',
			PARAMETER_NOT_PROVIDED:
				'Property "${name}" is required, but its value was not provided, or is falsey.',
		},
		Guild: {
			CHANNEL_NOT_OWNED_BY_GUILD:
				'The channel with ID "${channelID}" you provided is not owned by the guild "${guildID}".',
			CHANNEL_NOT_FOUND: "The channel you provided was not found.",
		},
	},
};

export interface ErrorArgs {
	Command: {
		message?: string;
		name?: string;
		expected?: string;
		received?: string;
		command?: string;
	};
	Discord: {
		guildID?: string;
		channelID?: string;
	};
}

export type ErrorTypes = keyof ErrorArgs;