// Одна проверка для формы на клиенте и для серверного роута (shared/ виден обоим).
export const MATERIAL_LIMITS = {
  title: 80,
  short_description: 255,
} as const

export type MaterialErrors = Partial<Record<keyof MaterialInput, string>>

export function validateMaterial(input: Partial<MaterialInput>): MaterialErrors {
  const errors: MaterialErrors = {}

  const title = input.title?.trim() ?? ''
  if (!title) {
    errors.title = 'Введите заголовок'
  } else if (title.length > MATERIAL_LIMITS.title) {
    errors.title = `Не более ${MATERIAL_LIMITS.title} символов`
  }

  if ((input.short_description?.length ?? 0) > MATERIAL_LIMITS.short_description) {
    errors.short_description = `Не более ${MATERIAL_LIMITS.short_description} символов`
  }

  if (!input.datetime || Number.isNaN(Date.parse(input.datetime))) {
    errors.datetime = 'Укажите корректную дату'
  }

  return errors
}
