<script setup lang="ts">
definePageMeta({ headerAction: 'save' })

const saving = useState<boolean>('materialSaving', () => false)
const { load: refreshMaterials } = useMaterials()

const form = reactive({
  title: '',
  short_description: '',
  datetime: '',
  description_html: '',
  description_json: {} as Record<string, unknown>,
})
const errors = ref<MaterialErrors>({})
const submitError = ref('')

function toInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// Текущее время подставляем на клиенте, иначе оно разойдётся с серверным при гидратации
onMounted(() => {
  form.datetime = toInputValue(new Date())
})

// На сервер дата уходит в ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
function toIso(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

async function onSubmit() {
  if (saving.value) return

  const payload: MaterialInput = { ...form, datetime: toIso(form.datetime) }

  errors.value = validateMaterial(payload)
  if (Object.keys(errors.value).length) return

  saving.value = true
  submitError.value = ''
  try {
    const response = await $fetch<SaveMaterialResponse>('/api/materials/save', {
      method: 'POST',
      body: payload,
    })
    if (!response.success || response.id === undefined) {
      throw new Error('Сервер не сохранил материал')
    }

    // Сервер вернул только id, поэтому обновляем список и открываем материал уже с данными сервера.
    // Если список не обновился, детальная страница догрузит его сама.
    await refreshMaterials(true).catch(() => {})
    await navigateTo(`/materials/${response.id}`)
  } catch {
    submitError.value = 'Не удалось сохранить материал. Попробуйте ещё раз.'
  } finally {
    saving.value = false
  }
}

onBeforeUnmount(() => {
  saving.value = false
})
</script>

<template>
  <section class="create container">
    <div class="create__content">
      <BackLink to="/" />
      <h1 class="create__title">Создание материала</h1>

      <form id="material-form" class="create__card" novalidate @submit.prevent="onSubmit">
        <label class="field field--date">
          <span class="field__label">Дата и время</span>
          <input v-model="form.datetime" type="datetime-local" required />
          <span v-if="errors.datetime" class="field__error" role="alert">{{ errors.datetime }}</span>
        </label>

        <div class="field">
          <textarea v-model="form.title" class="field__title" rows="1" placeholder="Введите заголовок"
            aria-label="Заголовок" :aria-invalid="!!errors.title" @keydown.enter.prevent />
          <div class="field__meta">
            <span v-if="errors.title" class="field__error" role="alert">{{ errors.title }}</span>
            <span class="field__counter" :class="{ 'is-over': form.title.length > MATERIAL_LIMITS.title }">
              {{ form.title.length }}/{{ MATERIAL_LIMITS.title }}
            </span>
          </div>
        </div>

        <div class="field">
          <textarea v-model="form.short_description" class="field__description" rows="1"
            placeholder="Введите краткое описание…" aria-label="Краткое описание"
            :aria-invalid="!!errors.short_description" />
          <div class="field__meta">
            <span v-if="errors.short_description" class="field__error" role="alert">
              {{ errors.short_description }}
            </span>
            <span class="field__counter" :class="{
              'is-over': form.short_description.length > MATERIAL_LIMITS.short_description,
            }">
              {{ form.short_description.length }}/{{ MATERIAL_LIMITS.short_description }}
            </span>
          </div>
        </div>

        <RichTextEditor v-model:html="form.description_html" v-model:json="form.description_json" />

        <p v-if="submitError" class="field__error" role="alert">{{ submitError }}</p>
      </form>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';
@import '~/assets/styles/breakpoints.less';

.create {
  padding-block: var(--space-6);

  &__content {
    max-width: var(--content-width);
    margin-inline: auto;
  }

  &__title {
    .text-h1();
    margin-top: var(--space-4);
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6);
    margin-top: var(--space-5);
    background: var(--color-white);
    border-radius: var(--radius);

    .mobile({
      padding: var(--space-4) var(--space-3);
    });
}
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  &--date {
    .text-card-date();
    align-self: flex-start;
    color: var(--color-light-gray);

    input {
      color: var(--color-gray);
    }
  }

  &__title,
  &__description {
    width: 100%;
    padding: 0;
    color: var(--color-black);
    resize: none;
    background: none;
    border: 0;
    outline: none;
    field-sizing: content; // высота растёт вместе с текстом

    &::placeholder {
      color: var(--color-light-gray);
    }
  }

  &__title {
    .text-h1();
  }

  &__description {
    .text-description();
  }

  &__meta {
    display: flex;
    gap: var(--space-3);
    justify-content: flex-end;
  }

  &__counter {
    .text-card-date();
    margin-left: auto;
    color: var(--color-light-gray);

    &.is-over {
      color: var(--color-error);
    }
  }

  &__error {
    .text-card();
    color: var(--color-error);
  }
}
</style>
