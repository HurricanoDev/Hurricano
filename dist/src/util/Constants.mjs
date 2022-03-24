/* eslint-disable quotes */
export default {
    Errors: {
        Command: {
            CUSTOM: null,
            WRONG_COMMAND_PARAMETER_TYPE: 'An invalid type was provided for property "${name}". Expected "${Util.getType(expected)}", but received "${Util.getType(received)}".',
            NO_COMMAND_PARAMETER: 'Property "${name}" is required, but its value was not provided, or is falsey.',
        },
        Guild: {
            CHANNEL_NOT_OWNED_BY_GUILD: "The channel you provided is not owned by the guild you used getRESTChannel() on.",
            CHANNEL_NOT_FOUND: "The channel you provided was not found.",
        },
    },
};
