// Сервер отдаёт дату как "2026-10-16 09:51:00" (UTC, без пояса),
// а при создании мы отправляем ISO. Понимаем оба формата.
export function parseMaterialDate(value: string): Date {
  const iso = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`
  return new Date(iso)
}

// Часовой пояс зафиксирован, чтобы сервер и браузер рисовали одну и ту же дату (без ошибки гидратации)
const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Moscow',
})

// "21 сентября"
export function formatMaterialDate(value: string): string {
  const date = parseMaterialDate(value)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}

// Свежие материалы выше
export function compareByDateDesc(a: Material, b: Material): number {
  return parseMaterialDate(b.datetime).getTime() - parseMaterialDate(a.datetime).getTime()
}
