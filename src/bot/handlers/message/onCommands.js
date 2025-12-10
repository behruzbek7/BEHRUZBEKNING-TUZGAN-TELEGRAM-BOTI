import User from "../../../models/User.js";
import { bot } from "../../bot.js";

async function onCommands(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text == "/start") {
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      const newUser = new User({
        chatId: chatId,
        firstname: firstname,
        username: msg.chat.username,
      });

      newUser.save();
    } else {
      console.log(existingUser);
    }

    return bot.sendMessage(
      chatId,
      `Assalomu aleykum, xush kelibsiz, ${firstname}`
      `
          👋 Assalomu alaykum, ${firstname}!
  
  📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!
  
  Bu bot orqali siz:
  • Kurslarimiz haqida batafsil ma’lumot olasiz  
  • Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
  • Jadval va to‘lovlar haqida ma’lumot olasiz  
  
  Quyidagi menyudan kerakli bo‘limni tanlang 👇
  
          `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  }

  if (text == "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

  if (text == "/users") {
    const userSoni = await User.countDocuments();

    const allUsers = await User.find();
    bot.sendMessage(chatId, `Foydanuvchilar [${userSoni}]:`);

    console.log(allUsers);
   

    for (let user of allUsers) {
      bot.sendMessage(chatId, `${user.firstname} -> ${user.chatId}`);
    }
    return;
  }

  if (text == "/profile") {
    const existingUser = await User.findOne({ chatId: chatId });

    console.log(existingUser);

    return bot.sendMessage(
      chatId,
      `
Mening Profilim:\n
|--chatId: ${existingUser.chatId}
|--ism: ${existingUser.firstname} 
|--username: ${existingUser.username}
|--active: ${existingUser.active}
|--balance: ${existingUser.balance}
|___________
    `
    );
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);
}

export default onCommands;