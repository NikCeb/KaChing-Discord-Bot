import { readdirSync } from "fs";
import { join } from "path";

function loadEvents(client) {
  const eventFiles = readdirSync(join(process.cwd(), "src/events")).filter(
    (file) => file.endsWith(".js")
  );

  for (const file of eventFiles) {
    console.log(`🔔 Loading event: ${file}`);
    import(`../events/${file}`)
      .then((event) => {
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
      })
      .catch((error) =>
        console.error(`❌ Error loading event ${file}:`, error)
      );
  }
}

export default loadEvents;
