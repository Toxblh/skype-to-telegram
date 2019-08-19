import * as dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import { connect } from 'skype-http'
import { cleanSkypeMessage, getFileFromSkype } from './utils'

dotenv.config()

const username = process.env.SKYPE_LOGIN || ''
const password = process.env.SKYPE_PASSWORD || ''
const telegramToken = process.env.TELEGRAM_TOKEN || ''
const chatId = process.env.CHAT_ID || ''

const bot = new TelegramBot(telegramToken, { polling: true })

enum SkypeMessageTypes {
  UriObject = 'RichText/UriObject',
  Media_Album = 'RichText/Media_Album', // More then 1 photo (can skiped, next skype send separrate)
  Media_Card = 'RichText/Media_Card', // Spotify share, also OneDrive share, I think any unsupport shares
  Media_AudioMsg = 'RichText/Media_AudioMsg', // Voice message
  Media_GenericFile = 'RichText/Media_GenericFile',
  Media_Video = 'RichText/Media_Video',
}

const credentials = {
  username,
  password,
}

let api
let users
let conversations
let myId

async function onMessage(event) {
  if (
    event.resource.type !== 'RichText' &&
    event.resource.type !== 'Text' &&
    event.resource.type !== 'RichText/UriObject' &&
    event.resource.type !== 'RichText/Media_AudioMsg' &&
    event.resource.type !== 'RichText/Media_GenericFile' &&
    event.resource.type !== 'RichText/Media_Video'
  ) {
    return
  }

  console.log('\nonNewMessage')
  console.log(event)
  console.log('\n $$')

  const content = event.resource.content

  const fromId = event.resource.from.username
  const fromUser = event.resource.native.imdisplayname
  const fromThread = event.resource.native.threadtopic

  const toId = event.resource.conversation
  const toThread = event.resource.native.threadtopic

  if (fromId === myId) {
    // From me to people

    const toTitle = toThread
      ? toThread
      : users.find((contact) => contact.personId === toId).displayName

    console.log(`Try to sync message ${fromUser}" >>> "${toTitle}`)

    sendToTelegram(
      `{${toId}}\n["${fromUser}" >>> "${toTitle}"]\nsent ${cleanSkypeMessage(content)}`,
    )
  } else {
    // From people to me

    const userTitle =
      !fromThread || fromUser === fromThread
        ? fromUser
        : `"${fromThread}" <<< "${fromUser}"`

    console.log(`Try to send message from ${userTitle}`)

    switch (event.resource.type) {
      case 'RichText':
      case 'Text':
        // send text
        sendToTelegram(`{${toId}}\n[${userTitle}]\n${cleanSkypeMessage(content)}`)
        break

      case SkypeMessageTypes.UriObject:
        // some uri obj

        const uri = event.resource.uri
        const uri_type = event.resource.uri_type // Picture.1
        const getFile = await getFileFromSkype(uri, api.context.skypeToken.value)
        // TODO get as file and send to telegram

        sendToTelegram(`{${toId}}\n[${userTitle}]\n someVideoFile`)
        break

      case 'RichText/Media_AudioMsg':
        // send audio msg
        // TODO send as voice msg

        sendToTelegram(`{${toId}}\n[${userTitle}]\n someVideoFile`)
        break

      case 'RichText/Media_Video':
        // send video
        // TODO send as video

        sendToTelegram(`{${toId}}\n[${userTitle}]\n someVideoFile`)
        break

      default:
        break
    }
  }
}

function sendToTelegram(text) {
  bot.sendMessage(chatId, text)
}

async function sendToSkype(conversationId, textContent) {
  await api.sendMessage({ textContent }, conversationId)
}

async function initSkype() {
  api = await connect({ credentials })

  myId = api.context.username
  users = await api.getContacts()
  conversations = await api.getConversations()

  api.on('event', (event) => {
    if (event.resourceType === 'NewMessage') {
      onMessage(event)
    }
  })

  await api.listen()
}

function initTelegram() {
  bot.on('text', (mess) => {
    console.log('\n ###')
    console.log('mess')
    console.log(mess)
    console.log('\n ###')

    if (String(mess.chat.id) !== chatId) {
      return
    }

    if (mess.reply_to_message !== undefined) {
      const content = mess.reply_to_message.text
      console.log(content)
      const getToId = content.match(/^{([:\d\w]+)}/)[1]
      console.log(getToId)

      sendToSkype(getToId, mess.text)
    }
  })

  // /get contacts
  // /get conversations
}

initSkype()
initTelegram()
