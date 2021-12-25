import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { generateQR } from './generateQR.js'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start((ctx) => ctx.reply('Welcome, this telegram bot can create any QR'))

bot.on('sticker', (ctx) => ctx.reply('Nice sticker bro!'))

bot.help((ctx) => {
    bot.telegram.sendMessage(ctx.chat.id,'That\'s what I can do for you',
        {
            reply_markup: {
                keyboard: [
                    [{text: 'Generate a QR code'}],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            }   
        } 
    )
})

bot.hears('Generate a QR code', ctx => {
    let name= ctx.update.message.from.first_name.toLowerCase()
    name = name[0].toUpperCase() + name.slice(1)
    ctx.reply(`${name}, send data that you woud like to put in QR code`)

    bot.on('message', async(ctx) => {
        const data = ctx.update.message.text
        await generateQR(data)
        ctx.replyWithPhoto({ source: './QR.png' })
    })

}) 
 

bot.launch()

