<p align="center">
    <img width="425px" src="https://github.com/Toxblh/skype-to-telegram/blob/master/images/SkypeToTelegram.png" />
</p>

# Skype to Telegram bot

## Important. MS change auth flow and at current moment it's doesn't work. But you can to help to fix login flow here https://github.com/Toxblh/skype-http-api/blob/master/src/lib/providers/microsoft-account.ts

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

Troubleshooting

If you see in the log that at the start like that
```skype-bot_1  | (node:1) UnhandledPromiseRejectionWarning: MicrosoftAccountLogin: Unable to login with MicrosoftAccount.
skype-bot_1  |   caused by GetLiveToken: Unable to get the Live token for Skype
skype-bot_1  |   caused by LiveTokenNotFound: Unable to find the Live token. This token is normally found in the HTML response as the value of the element with the id```

You need to open https://web.skype.com/
Login once and on question about dont exit from system answer "yes" and remember

Next to restart the docker
