export const name = "playlistAdd";
export const run = async (queue, playlist) => {
    const message = queue.metadata;
    message.channel.sendError(message, "Song Successfully Added!", `${playlist.title} has been added to the queue! The queue currently has **${playlist.tracks.length}** songs!`);
};
export default {
    name,
    run,
};
