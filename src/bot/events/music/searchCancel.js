export const name = "searchCancel";
export const run = async (queue) => {
    const message = queue.metadata;
    message.channel.sendError(message, "Invalid Response.", `You did not provide a valid response. Please try again.`);
};
export default {
    name,
    run,
};
