import { readdirSync } from "fs";
import { join } from "path";

async function loadEvents(client) {
  const eventFiles = readdirSync(join(process.cwd(), "src/events")).filter(
    (file) => file.endsWith(".js")
  );

  const eventPromises = eventFiles.map(async (file) => {
    try {
      const event = await import(`../events/${file}`);

      if (!event.default || !event.default.name) {
        console.warn(`⚠️ Skipping invalid event file: ${file}`);
        return;
      }

      if (event.default.once) {
        client.once(event.default.name, (...args) =>
          event.default.execute(...args)
        );
      } else {
        client.on(event.default.name, (...args) =>
          event.default.execute(...args)
        );
      }

      console.log(`✅ Loaded event: ${event.default.name} from ${file}`);
    } catch (error) {
      console.error(`❌ Error loading event ${file}:`, error);
    }
  });

  await Promise.all(eventPromises);
  console.log(`🔔 All events loaded successfully`);
}

export default loadEvents;
