// TODO ADD the responses here
import { EmbedBuilder, userMention, MessageFlags } from "discord.js";
import { manageRecords } from "../database_response/db_response.js";

export default async function guild_response(interaction) {
  const reponse = new ResponseService(interaction);
  try {
    switch (interaction.commandName) {
      case "charge":
        switch (
          interaction.options._subcommand // subcommand / options under charge command
        ) {
          case "create-charge":
            await reponse.createCharge(interaction);
            break;
          case "pay-charge":
            await reponse.payCharge(interaction);
            break;
          default:
            await interaction.reply("Invalid command");
            break;
        }
        break;
      case "get-balances":
        await reponse.getLoanData(interaction);
        break;
      case "send-reminder":
        await reponse.sendReminder(interaction);
        break;
      case "help":
        await help(interaction);
        break;
      default:
        await interaction.reply("Invalid command");
    }
  } catch (error) {
    console.error("Error handling command:", error);
    await interaction.reply("An error occurred while processing your command.");
  }
}

class ResponseService {
  constructor(interaction) {
    const options = interaction.options._hoistedOptions;
    this.interaction = interaction;
    this.amount =
      options.find((option) => option.name === "amount")?.value || 0;
    this.date = Date(options[2]?.date?.value || Date.now());
    this.userID_lender = interaction.user.id; // Lender ID is the user who is issuing the command
    this.userName_lender = interaction.user.username; // Lender Name is the user who is issuing the command
    this.userID_borrower = options[0]?.value || null; // Borrower ID is the first option
    this.userName_borrower = options[0]?.user?.username || "Unknown"; // Borrower ID is the first option

    this.interactionData = {
      date: this.date,
      amount: this.amount,
      lenderID: this.userID_lender, // Lender ID is the user who is issuing the command
      lenderName: this.userName_lender, // Lender Name is the user who is issuing the command
      borrowerID: this.userID_borrower, // Borrower ID is the target user
      borrowerName: this.userName_borrower, // Borrower Name is the target user
    };

    this.embed = new EmbedBuilder()
      .setAuthor({
        name: "KaChing Bot",
      })
      .setThumbnail(
        "https://raw.githubusercontent.com/NikCeb/KaChing-Discord-Bot/refs/heads/main/images/KaChingBot.jpg"
      )
      .setTimestamp()
      .setFooter({
        text: "KaChing Discord Bot",
        iconURL:
          "https://raw.githubusercontent.com/NikCeb/KaChing-Discord-Bot/refs/heads/main/images/KaChingBot.jpg",
      });
  }

  // Send Reminder to the borrower
  async sendReminder() {
    if (this.interaction.user.id === this.userID_borrower) {
      return await this.interaction.reply(
        "You cannot send a reminder to yourself",
        {
          flags: MessageFlags.Ephemeral,
        }
      );
    } else {
      const loanData = await manageRecords("read", this.interactionData);
      console.log(loanData);
      this.embed
        .setTitle(`Reminder! Reminder! Reminder!`)
        .setDescription(
          `This is a reminder for you to pay your recent dues ${userMention(
            this.userID_borrower
          )}. Your Balance is as follows: $  ${loanData[0].balance.toString()}`
        )
        .setImage(
          "https://raw.githubusercontent.com/NikCeb/KaChing-Discord-Bot/refs/heads/main/images/burn_the_money_danny_devito.gif"
        );

      if (Array.isArray(loanData) && loanData.length > 0) {
        loanData.slice(0, 4).forEach((loan) => {
          this.embed.addFields({
            name: `Loan on ${new Date(loan.date).toDateString()}`,
            value: `Php ${loan.amount.toString()} owed to -> ${
              loan.lenderName
            }`,
            inline: true,
          });
        });
        this.embed.setColor("#FF0000");
      } else {
        this.embed.setColor("#00FF00");
        this.embed.addFields({
          name: "Loan Debt",
          value: "No Pending Balance",
        });
      }
      await this.interaction.reply({
        embeds: [this.embed],
        flags: MessageFlags.None,
      });
    }
  }
  // Get user balance
  async getLoanData() {
    const loadData = await manageRecords("read", this.interactionData);
    this.embed
      .setTitle(`Your Outstanding Balance is as follows: ${loadData.balance}`)
      .setDescription(
        `This is a reminder for you to pay your recent dues ${userMention(
          this.userID_borrower
        )}.`
      )
      .setImage(
        "https://raw.githubusercontent.com/NikCeb/KaChing-Discord-Bot/refs/heads/main/images/burn_the_money_danny_devito.gif"
      );
    if (Array.isArray(loanData) && loanData.length > 0) {
      loanData.slice(0, 4).forEach((loan) => {
        this.embed.addFields(
          {
            name: `Loan on ${new Date(loan.date).toDateString() || ""}`,
            value: `Php ${loan.amount.toString()} owed to -> ${
              loan.lenderName
            }`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B", inline: true }
        );
      });
      this.embed.setColor("#FF0000");
    } else {
      this.embed.setColor("#00FF00");
      this.embed.addFields({ name: "Loan Debt", value: "No Pending Balance" });
    }
    await this.interaction.reply({
      embeds: [this.embed],
      flags: MessageFlags.None,
    });

    return "No records found";
  }

  // Create a charge for the borrower
  async createCharge() {
    await manageRecords("create", this.interactionData);
    return await this.interaction.reply("Charge Created", {
      flags: MessageFlags.Ephemeral,
    });
  }

  // Pay the charge
  async payCharge() {
    if (this.interaction.user.id === this.userID_borrower) {
      return await this.interaction.reply("You cannot pay yourself", {
        flags: MessageFlags.Ephemeral,
      });
    }
    await manageRecords("delete", this.interactionData);
    return await this.interaction.reply("Charge Paid", {
      flags: MessageFlags.Ephemeral,
    });
  }
}

async function help(interaction) {
  const help = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/charge create-charge", inline: true },
      { name: "Pay Charges", value: "/charge pay-charge", inline: true },
      { name: "Send Reminder", value: "/send-reminder", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await interaction.reply({ embeds: [help], flags: MessageFlags.Ephemeral });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
