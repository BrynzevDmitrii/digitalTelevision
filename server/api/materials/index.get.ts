// Прокси к внешнему API: браузер ходит на наш /api/materials, поэтому CORS не мешает.
export default defineEventHandler(async (event) => {
  const url = materialsUrl(event)

  try {
    const materials = await $fetch<Material[]>(url)
    // Очищаем HTML на сервере, в браузер приходит уже безопасный
    return materials.map((material) => ({
      ...material,
      description_html: cleanHtml(material.description_html ?? ''),
    }))
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Materials API is unavailable' })
  }
})
