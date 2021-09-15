export const name = "channelEmpty";
export const run = async (queue) => {
    const message = queue.metadata;
    message.channel.sendError(message, "Music Playback Stopped.", `Music playback has been seized as there is no one in the voice channel.`);
};
export default {
    name,
    run,
};
