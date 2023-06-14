import { Composer, Scenes, session } from 'telegraf';
import { bot } from '../bot';
import { MyContext } from '../types';
import { devConsumerChatId, devProducerChatId } from '../config';

const stepHandler = new Composer<MyContext>();

const wizardId = 'create-event';
const createEvent = new Scenes.WizardScene(
  wizardId,
  async (ctx) => {
    await ctx.reply('What is the name of your event?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'text' in ctx.message) {
      ctx.scene.session.eventName = ctx.message?.text;
    }
    await ctx.reply('What date is your event?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'text' in ctx.message) {
      ctx.scene.session.date = ctx.message?.text;
    }
    await ctx.reply('What time is your event?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'text' in ctx.message) {
      ctx.scene.session.time = ctx.message?.text;
    }
    await ctx.reply('Where is your event?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'text' in ctx.message) {
      ctx.scene.session.location = ctx.message.text;
    }
    await ctx.reply(
      'Do you have a picture for your event? If so, attach it now. If not, type "no"'
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'photo' in ctx.message) {
      ctx.scene.session.photo = ctx.message.photo.sort(
        (a, b) => (b.file_size ?? 0) - (a.file_size ?? 0)
      )[0].file_id;
    }
    const eventDescription = `
    Event Name: ${ctx.scene.session.eventName}
Date: ${ctx.scene.session.date}
Time: ${ctx.scene.session.time}
Location: ${ctx.scene.session.location}`;
    let message_id: number;
    if (ctx.scene.session.photo) {
      const resp = await ctx.telegram.sendPhoto(devProducerChatId, ctx.scene.session.photo, {
        caption: eventDescription,
      });
      message_id = resp.message_id;
    } else {
      const resp = await ctx.telegram.sendMessage(devProducerChatId, eventDescription);
      message_id = resp.message_id;
    }

    const message = `${eventDescription}\n\nhttps://t.me/c/${devProducerChatId
      .toString()
      .replace('-100', '')}/${message_id}`;

    if (ctx.scene.session.photo) {
      await ctx.telegram.sendPhoto(devConsumerChatId, ctx.scene.session.photo, {
        caption: message,
      });
    } else {
      await ctx.telegram.sendMessage(devConsumerChatId, message);
    }
    return ctx.scene.leave();
  },
  stepHandler
);

const stage = new Scenes.Stage<MyContext>([createEvent]);

bot.use(session());
bot.use(stage.middleware());

bot.command('createEvent', async (ctx) => {
  return ctx.scene.enter(wizardId);
});

//  a picture
//  a hyperlinked URL ("here" and not the long URL to make people join the group)
//  a date
//  name of event
//  time of event
//  location of event
//  [nice to have] "Bitcoin only " yes/no
