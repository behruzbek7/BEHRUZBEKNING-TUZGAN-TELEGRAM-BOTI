import TelegramBot from "node-telegram-bot-api";

const TOKEN = "7568316605:AAFseC-EHV2tE2wF2RRZHuarT4IYJFBD3mk";

const bot =TelegramBot(TOKEN,{polling: true});

bot.on("Message", function(msg) {
    const chatID =msg.chat.id;
    bot.sendMessage(chatID,"Salom");
});






 console.log("Bot ishga tushdi0................")