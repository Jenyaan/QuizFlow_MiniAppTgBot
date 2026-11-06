import { Bot } from "npm:grammy";

const bot = new Bot("9001179934:AAHCgJCcaj0J8wd9CzODgj-sutI8uuVjxyQ");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();