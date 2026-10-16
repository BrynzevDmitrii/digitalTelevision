export interface Material {
  id: number | string
  title: string
  short_description: string
  datetime: string
  description_html: string
  description_json: Record<string, unknown>
}

// То, что отправляется на сервер при создании (id присваивает сервер)
export type MaterialInput = Omit<Material, 'id'>

// Ответ сервера на сохранение: самого материала в нём нет, только id
export interface SaveMaterialResponse {
  success: boolean
  id?: number
  errors: unknown[]
}
