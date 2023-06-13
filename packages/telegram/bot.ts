import { Telegraf } from 'telegraf';

export const bot = new Telegraf(process.env.TELEGRAM_API_KEY, {
  telegram: { webhookReply: true },
});
