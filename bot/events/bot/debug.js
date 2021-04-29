module.exports = {
    name: "debug",
    run: async (debug, client) => {
        client.logger.info(debug)
    }
}