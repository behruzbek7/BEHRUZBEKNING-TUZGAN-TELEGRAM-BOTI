import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./handlers/message/onCommands.js";
import onError from "./handlers/message/onError.js";
dotenv.config();

const CHANNEL_ID = "@academy_100x_uz";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

  console.log(chatMember);

  if (chatMember.status == "kicked" || chatMember.status == "left") {
    return bot.sendMessage(
      chatId,
      `Oldin shu kanalga obuna bo'ling @academy_100x_uz`,
      {
        reply_markup: {
          remove_keyboard: true,
          inline_keyboard: [
            [
              {
                text: "100x Academy Xiva",
                url: "https://t.me/academy_100x_uz",
              },
            ],
            [
              {
                text: "Obunani tasdiqlash ✅",
                callback_data: "confirm_subscription",
              },
            ],
          ],
        },
      }
    );
  }

  if (text.startsWith("/")) {
    return onCommands(msg);
  }

  return onError();
});

bot.on("callback_query", async function (query) {
  const chatId = query.message.chat.id;
  const firstname = query.message.chat.first_name;
  const data = query.data;

  if (data == "confirm_subscription") {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

    console.log(chatMember);

    if (chatMember.status == "kicked" || chatMember.status == "left") {
      return bot.sendMessage(
        chatId,
        `Oldin shu kanalga obuna bo'ling @academy_100x_uz`,
        {
          reply_markup: {
            remove_keyboard: true,
            inline_keyboard: [
              [
                {
                  text: "100x Academy Xiva",
                  url: "https://t.me/academy_100x_uz",
                },
              ],
              [
                {
                  text: "Obunani tasdiqlash ✅",
                  callback_data: "confirm_subscription",
                },
              ],
            ],
          },
        }
      );
    }
  }
});

console.log("Bot ishga tushdi...");