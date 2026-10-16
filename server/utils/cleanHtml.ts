import sanitizeHtml from 'sanitize-html'

// HTML материала приходит с внешнего сервера и выводится через v-html,
// поэтому оставляем только то, что умеет делать наш редактор (абзацы, заголовки, цитата, списки, ссылки).
export function cleanHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'h1', 'h2', 'h3', 'blockquote',
      'strong', 'em', 's', 'u', 'code', 'pre', 'hr', 'ul', 'ol', 'li', 'a',
    ],
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  })
}
