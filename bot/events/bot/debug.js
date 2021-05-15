module.exports = {
  name: "debug",
  run: async (debug, client) => {
    if (!debug.toLowerCase().includes('voice')) client.logger.info(debug);
  },
};
