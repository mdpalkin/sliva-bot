import path from 'path'
import fs from 'fs'
import { Context, Markup } from 'telegraf'

export const sendStartMenu = async (ctx: Context) => {
  const welcomeText =
    '👋 Привет! Я бот магазина SLIVA cake.\n\n' +
    '📝 Ты можешь посмотреть наш каталог, оставить свой отзыв или посмотреть отзывы других пользователей.\n\n' +
    'Выбери действие ниже:';

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('⭐️ Посмотреть каталог', 'view_catalog')],
    [Markup.button.callback('📝 Добавить отзыв', 'add_review')],
    [Markup.button.callback('📚 Посмотреть отзывы', 'show_reviews')],
  ]);

  ctx.sendPhoto(
    {source: fs.createReadStream(path.resolve(__dirname, '..', 'static', 'photo.jpg'))},
    {
      caption: welcomeText,
      ...keyboard,
    }
  );
}
