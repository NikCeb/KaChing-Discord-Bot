import dm_response from "../handlers/dmResponses.js";

export default {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    if (message.channel.type === ChannelType.DM) {
      try {
        await dm_response(message);
      } catch (error) {
        console.error("Failed to send a reply in DM:", error);
      }
    }
  },
};
