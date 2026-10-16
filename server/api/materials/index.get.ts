// Прокси к внешнему API: браузер ходит на наш /api/materials, поэтому CORS не мешает.
export default defineEventHandler(async (event) => {
  const url = materialsUrl(event)

  try {
    return await $fetch<Material[]>(url)
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Materials API is unavailable' })
  }
})
