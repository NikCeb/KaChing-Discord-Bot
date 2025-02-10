// TODO ADD the responses here
import { EmbedBuilder, userMention, MessageFlags } from "discord.js";
import { manageRecords } from "../database_response/db_response.js";

export default async function guild_response(interaction) {
  const reponse = new ResponseService(interaction);
  const command = interaction.commandName;
  try {
    switch (command) {
      case "create-charge":
        await reponse.create_charge(interaction);
        break;
      case "pay-charges":
        await reponse.payCharge(interaction);
        break;
      case "get-balances":
        await reponse.getLoanData(interaction);
        break;
      case "send-reminder":
        console.log("Reminder sent");
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
    this.interaction = interaction;
    this.userID_lender = interaction.user.id;
    this.userName_lender = interaction.user.username;
    this.userID_borrower = interaction.options._hoistedOptions[0].value;
    this.userName_borrower =
      interaction.options._hoistedOptions[0].user.username;
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
  //  TODO IF user send reminder is self then show use ephineral flags
  async sendReminder() {
    const loanData = await manageRecords("read", this.userID_borrower);
    this.embed
      .setTitle(`Reminder! Reminder! Reminder!`)
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
        this.debts.addFields(
          { name: "Amount", value: loan.amount.toString(), inline: true },
          { name: "Lender ID", value: loan.lenderID, inline: true },
          { name: "Lender Name", value: loan.lenderName, inline: true },
          { name: "Borrower ID", value: loan.borrowerID, inline: true },
          { name: "Borrower Name", value: loan.borrowerName, inline: true }
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
  }
  // Get user balance
  async getLoanData() {
    const loadData = await manageRecords("read", this.userID_borrower);
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
        this.debts.addFields(
          { name: "Amount", value: loan.amount.toString(), inline: true },
          { name: "Lender ID", value: loan.lenderID, inline: true },
          { name: "Lender Name", value: loan.lenderName, inline: true },
          { name: "Borrower ID", value: loan.borrowerID, inline: true },
          { name: "Borrower Name", value: loan.borrowerName, inline: true }
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

  async createCharge() {
    return await manageRecords("create", this.userID_borrower);
  }

  async payCharge() {
    return await manageRecords("delete", this.userID_borrower);
  }
}

async function help(interaction) {
  const help = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/create-charge", inline: true },
      { name: "Send Reminder", value: "/send-reminder", inline: true },
      { name: "Pay Charges", value: "/pay-charge", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await interaction.reply({ embeds: [help], flags: MessageFlags.Ephemeral });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
