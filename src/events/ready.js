import registerCommands from "../utils/registerCommands.js";

export default {
  name: "ready",
  // Listener using Ready to tell if bot is running.
  once: true,
  async execute(c) {
    try {
      await registerCommands();
      console.log(`RUNNING ${c.user.tag} (${c.user.id}) is HERE`);
    } catch (error) {
      console.error("Failed to register commands:", error);
    }
  },
};
