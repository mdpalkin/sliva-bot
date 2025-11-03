import fs from 'fs'
import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';

import { sendStartMenu } from './actions'
import { CAKES, FILLINGS } from './consts'
import { addReview, getReviews } from './storage';
import { InputMediaDocument } from 'telegraf/types'
import { BotActionsEnum } from './enums'

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);
const awaitingReviewUsers = new Set<number>();

bot.start(sendStartMenu);

bot.action(BotActionsEnum.VIEW_CATALOG, async (ctx) => {
  await ctx.answerCbQuery()
  const text = 
  '👀 Что хочется посмотреть?'
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🍰 Тортики', BotActionsEnum.VIEW_CAKES)],
    [Markup.button.callback('🍯 Начинки', BotActionsEnum.VIEW_FILLINGS)],
    [Markup.button.callback('⬅️ Назад в меню', BotActionsEnum.BACK_TO_MENU)],
  ]);

  ctx.reply(text, keyboard)
})

bot.action(BotActionsEnum.VIEW_CAKES, async (ctx) => {
  await ctx.answerCbQuery();

  for (const cake of CAKES) {
    const photos = cake.images
      .filter((imgPath) => fs.existsSync(imgPath))
      .map((imgPath) => ({ type: 'photo', media: { source: imgPath } }));

    if (photos.length > 1) {
      await ctx.replyWithMediaGroup(photos as InputMediaDocument[]);
    } else if (photos.length === 1) {
      await ctx.replyWithPhoto({ source: photos[0].media.source });
    }

    const description = fs.readFileSync(cake.description, 'utf-8')

    await ctx.replyWithMarkdown(
      `🍰 *${cake.title}*\n\n${description}`
    );
  }

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('⭐️ Назад к каталогу', BotActionsEnum.VIEW_CATALOG)],
    [Markup.button.callback('⬅️ Назад в меню', BotActionsEnum.BACK_TO_MENU)],
  ]);

  ctx.reply('🤗 Вот все наши тортики', keyboard)
});

bot.action(BotActionsEnum.VIEW_FILLINGS, async (ctx) => {
  await ctx.answerCbQuery();

  for (const filling of FILLINGS) {
    const photos = filling.images
      .filter((imgPath) => fs.existsSync(imgPath))
      .map((imgPath) => ({ type: 'photo', media: { source: imgPath } }));

    if (photos.length > 1) {
      await ctx.replyWithMediaGroup(photos as InputMediaDocument[]);
    } else if (photos.length === 1) {
      await ctx.replyWithPhoto({ source: photos[0].media.source });
    }

    const description = fs.readFileSync(filling.description, 'utf-8')

    await ctx.replyWithMarkdown(
      `🍯 *${filling.title}*\n\n${description}`
    );
  }

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('⭐️ Назад к каталогу', BotActionsEnum.VIEW_CATALOG)],
    [Markup.button.callback('⬅️ Назад в меню', BotActionsEnum.BACK_TO_MENU)],
  ]);

  ctx.reply('🤗 Вот все наши начинки', keyboard)
});

bot.action(BotActionsEnum.ADD_REVIEW, (ctx) => {
  awaitingReviewUsers.add(ctx.from.id);
  ctx.answerCbQuery();
  ctx.reply('✍️ Напиши свой отзыв:');
});

bot.action(BotActionsEnum.SHOW_REVIEWS, (ctx) => {
  const reviews = getReviews();

  ctx.answerCbQuery();

  if (reviews.length === 0) {
    ctx.reply('Пока нет отзывов 😔');
    return;
  }

  const text = reviews
    .map(
      (r) =>
        `👤 ${r.username || 'Аноним'}:\n"${r.text}"\n🕒 ${new Date(r.date).toLocaleString()}`
    )
    .join('\n\n');

  ctx.reply(text);
});

bot.on('text', (ctx) => {
  const userId = ctx.from.id;

  if (awaitingReviewUsers.has(userId)) {
    const reviewText = ctx.message.text.trim();

    if (!reviewText) {
      ctx.reply('⚠️ Отзыв не может быть пустым. Напиши что-нибудь 🙂');
      return;
    }

    addReview({
      userId,
      username: ctx.from.username || 'Аноним',
      text: reviewText,
      date: new Date().toISOString(),
    });

    awaitingReviewUsers.delete(userId);

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback('📚 Посмотреть отзывы', BotActionsEnum.SHOW_REVIEWS)],
      [Markup.button.callback('🏠 Главное меню', BotActionsEnum.BACK_TO_MENU)],
    ]);

    ctx.reply('✅ Спасибо! Твой отзыв сохранён.', keyboard);
  } else {
    ctx.reply('ℹ️ Чтобы оставить отзыв, нажми кнопку “📝 Добавить отзыв”.');
  }
});

bot.action(BotActionsEnum.BACK_TO_MENU, async (ctx) => {
  ctx.answerCbQuery();
  await sendStartMenu(ctx);
});

bot.launch();
console.log('🤖 Бот запущен...');
