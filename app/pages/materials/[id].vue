<script setup lang="ts">
const route = useRoute()
const { load, find } = useMaterials()
const id = String(route.params.id)

// Данные берём из общего списка: он уже загружен, если пришли со страницы списка,
// а при прямой ссылке или F5 загружается здесь (на сервере).
await load().catch(() => {
  throw createError({ statusCode: 502, statusMessage: 'Не удалось загрузить материал', fatal: true })
})

let material = find(id)
if (!material) {
  // список мог устареть (материал создан позже загрузки), пробуем обновить один раз
  await load(true)
  material = find(id)
}
if (!material) {
  throw createError({ statusCode: 404, statusMessage: 'Материал не найден', fatal: true })
}

useHead({ title: material.title })

// Редактор отдаёт <p></p> даже для пустого текста, такой блок не показываем
const hasBody = material.description_html.replace(/<[^>]*>/g, '').trim().length > 0
</script>

<template>
  <article class="detail container">
    <div class="detail__content">
      <BackLink to="/" />

      <div class="detail__card">
        <div class="detail__head">
          <div class="detail__date">
            <AppIcon name="calendar" :size="24" fit />
            <span>{{ formatMaterialDate(material.datetime) }}</span>
          </div>

          <h1 class="detail__title">{{ material.title }}</h1>
          <p v-if="material.short_description" class="detail__description">
            {{ material.short_description }}
          </p>
        </div>

        <!-- HTML приходит с сервера, ровно в том виде, как его отдал редактор -->
        <div v-if="hasBody" class="rich-text" v-html="material.description_html" />
      </div>
    </div>
  </article>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';
@import '~/assets/styles/breakpoints.less';

.detail {
  padding-top: 36px;
  padding-bottom: var(--space-6);

  &__content {
    max-width: var(--content-width);
    margin-inline: auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: var(--detail-gap);
    padding: var(--detail-padding);
    margin-top: var(--space-6);
    background: var(--color-white);
    border-radius: var(--radius-large);

    // Размеры мобильной версии в макете пока не уточнены (временные значения)
    .mobile({
      gap: var(--space-4);
      padding: var(--space-4) var(--space-3);
      border-radius: var(--radius);
    });
  }

  &__head {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__date {
    .text-body();
    display: flex;
    gap: var(--space-2);
    align-items: center;
    color: var(--color-light-gray);
  }

  &__title {
    .text-h1();
    color: var(--color-black);
  }

  &__description {
    .text-description();
    color: var(--color-black);
  }
}
</style>
