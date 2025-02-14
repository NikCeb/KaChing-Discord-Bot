import guildResponse from "../handlers/guildResponse.js";

export default {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    try {
      await guildResponse(interaction);
    } catch (error) {
      console.error("Failed to send a reply to interaction:", error);
    }
  },
};
