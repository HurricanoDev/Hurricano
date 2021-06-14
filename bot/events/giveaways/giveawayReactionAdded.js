module.exports = {
  name: "giveawayReactionAdded",
  run: async (giveaway, member, reaction) => {
    const role = member.guild.roles.cache.get(giveaway.extraData.role);
    if (
      giveaway.extraData.role !== "null" &&
      !member.roles.cache.get(giveaway.extraData.role)
    ) {
      reaction.users.remove(member.user);
      member.user.sendError("Requirement failed.", `You must have the role \`${role.name}\` to participate in that giveaway.`);
    }
  },
};
