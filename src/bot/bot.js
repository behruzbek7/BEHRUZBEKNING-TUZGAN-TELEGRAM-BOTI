import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./handlers/message/onCommands.js";
import onError from "./handlers/message/onError.js";
dotenv.config();

const CHANNEL_ID = "@IT_Park91";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    console.log(chatMember);


    if (chatMember.status == "kicked" || chatMember.status == "left") {
      return bot.sendMessage(
        chatId,
        `Oldin shu kanalga obuna bo'ling @https://t.me/IT_Park91`,
        {
          reply_markup: {
            remove_keyboard: true,
            inline_keyboard: [
              [
                {
                  text: "100x Academy Xiva",
                  url: "https://t.me/IT_Park91",
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

  } catch {
    console.log(`ERROR: error in checking if user subscribed to channel `);

  }




  if (text.startsWith("/")) {
    return onCommands(msg);
  }

  if (text == "📚 Kurslar") {
    bot.sendMessage(
      chatId,
      `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

    1️⃣ Ingliz tili  
    2️⃣ Rus tili  
    3️⃣ Matematika  
    4️⃣ Dasturlash (Python, Web)  
    5️⃣ Grafik dizayn  
    
    👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:
    `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
            [{ text: "🧮 Matematika", callback_data: "math" }],
            [{ text: "💻 Dasturlash", callback_data: "it" }],
            [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
          ],
        },
      }
    );
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