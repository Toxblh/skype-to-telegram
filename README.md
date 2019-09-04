<p align="center">
    <img width="425px" src="https://github.com/Toxblh/skype-to-telegram/blob/master/images/SkypeToTelegram.png" />
</p>

# Skype to Telegram bot

Your skype inside the telegram

You can start the bot with use [Docker](#Docker-way) or [your machine](#Manual-way)

# Before all

Create a `.env` with content

```
SKYPE_LOGIN=your_skype_login
SKYPE_PASSWORD=your_skype_password
TELEGRAM_TOKEN=token_from_botFather_for_telegram
CHAT_ID=your_chat_id
```
> [How to create a bot in telegram](https://www.sohamkamani.com/blog/2016/09/21/making-a-telegram-bot/)

> How to get the chat id: send `/echo` to [t.me/toxblh_bot](https://t.me/toxblh_bot) chat.id this what you need

# Docker way

[![Docker Hub](http://dockeri.co/image/toxblh/skype-to-telegram)](https://hub.docker.com/r/toxblh/skype-to-telegram)

```shell
docker run --env-file .env toxblh/skype-to-telegram
```

or

```shell
git clone https://github.com/Toxblh/skype-to-telegram
cd skype-to-telegram
docker-compose up
```

# Manual way

```shell
yarn
yarn build
node dist/index.js
```
