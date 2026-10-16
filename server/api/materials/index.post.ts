export default defineEventHandler(async (event) => {
  const url = materialsUrl(event, '/save')
  const body = await readBody<Partial<MaterialInput>>(event)

  const errors = validateMaterial(body ?? {})
  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Validation failed', data: { errors } })
  }

  const { title, short_description, datetime, description_html, description_json } = body
  try {
    return await $fetch<Material>(url, {
      method: 'POST',
      body: { title, short_description, datetime, description_html, description_json },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Materials API is unavailable' })
  }
})
