![Logo](./images/KaChingBot.jpg)

# 🤖KaChing Discord Bot🤖

# 🚀 LoanTracker Bot Features

A powerful Discord bot for managing loans and payments within your community!

## Key Features

- ✅ **Track Loans & Payments** – Keep a detailed record of member transactions.
- ✅ **Create Charges** – Easily add new loan entries for users.
- ✅ **Make Payments** – Log repayments and update balances in real-time.
- ✅ **View Transaction Logs** – Get a complete history of loans and payments.
- ✅ **Check Outstanding Balances** – Users can see their personal debt and dues.
- ✅ **Efficient & Lightweight** – Uses **SQLite** for fast and reliable data storage.

Perfect for communities, gaming guilds, and groups that need **simple, transparent financial tracking**! 🎯

Your bot is now set up and invited to your server! 🎉 Next, you can move on to coding and deploying your bot.

## Discord Developer Portal Bot Setup

## 1️⃣ Create a New Bot in the Developer Portal

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **"New Application"**.
3. Give your bot a name (e.g., **LoanTracker Bot**) and click **"Create"**.

---

## 2️⃣ Set Up the Bot

1. Navigate to the **"Bot"** tab (on the left).
2. Click **"Add Bot"**, then confirm.
3. Under **Privileged Gateway Intents**, enable:
   - ✅ **SERVER MEMBERS INTENT** (Needed if you want to track members)
   - ✅ **MESSAGE CONTENT INTENT** (If you need to read message content)
4. Click **"Reset Token"**, copy the token, and **store it in a `.env` file** (never share it!).

📌 **Important:** If you lose the token, reset it and update your bot’s code.

---

## 3️⃣ Invite the Bot to Your Server

1. Go to the **OAuth2 > URL Generator** tab.
2. Under **Scopes**, select:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Scroll down to **Bot Permissions**, select:
   - ✅ `Read Messages`
   - ✅ `Send Messages`
   - ✅ `Use Application Commands`
   - ✅ `Manage Messages` (if needed)
   - ✅ `Manage Roles` (if needed for loans)
4. Copy the generated link and **paste it into your browser** to invite the bot to your server.

---

Your bot is now set up and invited to your server! 🎉 Next, you can move on to coding and deploying your bot.

## Install and Run Locally

Clone the project:

```bash
git clone git@github.com:NikCeb/KaChing-Discord-Bot.git
```

Go to the project directory:

```bash
cd KaChing-Discord-Bot/src
```

Install dependencies:

```bash
npm install
```

Create .env file

```bash
BOT_TOKEN="Your Bot Token"
GUILD_ID="Your Guild Id"
CLIENT_ID="Your Client Id"
```

Start the Discord bot using `nodemon`:

```bash
nodemon
```

## Database

KaChing Discord Bot uses **SQLite**, a lightweight and efficient database, to store loan and payment records.

- The database file is located in the `/temp` folder.
- SQLite is ideal for small to medium-scale applications where simplicity and performance are key.

## Commands

- [Create Charge](#create-charge)
- [Pay Charge](#pay-charge)
- [Send Reminder](#send-reminder)

### Create Charge

Used by the lender to create a loan charge.

#### **Required Fields:**

- `borrower-username`
- `amount`

### Pay Charge

Used by the borrower to pay the borrowed amount.

#### **Required Fields:**

- `lender-username`
- `amount`

### Send Reminder

Used by the lender to send a reminder for outstanding balances.

#### **Required Fields:**

- `borrower-username`

## Authors

- [@NikCeb](https://github.com/NikCeb)
