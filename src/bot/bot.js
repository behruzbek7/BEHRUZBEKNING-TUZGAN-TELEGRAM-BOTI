import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  bot.sendMessage(chatId, `Assalomu aleykum, ${firstname}`);
});

console.log("Bot ishga tushdi...");