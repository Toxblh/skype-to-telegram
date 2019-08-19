/**
 * Some utils and helpers for work of bot
 */

export function cleanSkypeMessage(message: string): string {
  return message
    .replace(/<quote .*><legacyquote>/, '```\n<legacyquote>')
    .replace(/<legacyquote>/g, '')
    .replace(/<\/legacyquote>/g, '')
    .replace(/<\/quote>/g, '```\n')
    .replace(/\[.*\]/, '')
    .replace(/<<</, '')
    .replace(/&lt;&lt;&lt;/g, '')
}

export function getFileFromSkype(url: string, token: string) {
  // header for request
  // Authorization: `skype_token ${token}`
}
