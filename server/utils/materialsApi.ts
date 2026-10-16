import type { H3Event } from 'h3'

// Адрес внешнего API: https://naukatv.ru/api/test/materials/{alias}[/save]
export function materialsUrl(event: H3Event, suffix = ''): string {
  const { materialsApiBase, materialsAlias } = useRuntimeConfig(event)
  if (!materialsAlias) {
    throw createError({ statusCode: 500, statusMessage: 'NUXT_MATERIALS_ALIAS is not set' })
  }
  return `${materialsApiBase}/${materialsAlias}${suffix}`
}
