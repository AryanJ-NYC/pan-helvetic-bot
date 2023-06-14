import { bot } from '../bot';
import { devConsumerChatId } from '../config';
import rooms from '../rooms.json';

bot.command('broadcast', async (ctx) => {
  const messageToBroadcast = ctx.message.reply_to_message;
  if (!messageToBroadcast) {
    return;
  }

  const ogChatId = messageToBroadcast.chat.id.toString().replace('-100', '');
  const linkToBroadcastMessage = `https://t.me/c/${ogChatId}/${messageToBroadcast.message_id}`;
  const message = `New broadcast: ${linkToBroadcastMessage}`;

  if (process.env.VERCEL_ENV === 'production') {
    for (const room of rooms) {
      if (room.chatId && room.chatId !== ctx.message.chat.id) {
        await ctx.telegram.sendMessage(room.chatId, message);
      }
    }
  } else {
    await ctx.telegram.sendMessage(devConsumerChatId, message);
  }
});
