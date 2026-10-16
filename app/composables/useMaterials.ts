// Общий список материалов. useState хранит его между страницами и передаёт с сервера в браузер,
// поэтому детальная страница берёт данные из уже загруженного списка, без нового запроса.
export function useMaterials() {
  const items = useState<Material[] | null>('materials', () => null)

  // Всегда отсортирован: новые по дате выше
  const materials = computed(() => [...(items.value ?? [])].sort(compareByDateDesc))

  // Загружает список, если он ещё не загружен (или force = true)
  async function load(force = false) {
    if (items.value && !force) return
    items.value = await $fetch<Material[]>('/api/materials')
  }

  function find(id: string | number) {
    return items.value?.find((material) => String(material.id) === String(id))
  }

  function add(material: Material) {
    items.value = [material, ...(items.value ?? [])]
  }

  return { materials, load, find, add }
}
