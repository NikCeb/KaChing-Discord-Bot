![Logo](/KaChing-Discord-Bot/images/KaChingBot.jpg)

# KaChing Discord Bot

A loan and payment bot tracker for any Discord server size.

## Features

- Tracking loans and payments of Discord members
- Creating charges
- Making payments
- Showing logs
- Displaying personal outstanding balances for users
- Uses **SQLite** as a lightweight database for efficient storage and retrieval

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
