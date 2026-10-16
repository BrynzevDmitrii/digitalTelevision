<script setup lang="ts">
const { materials, load } = useMaterials()

const loadError = ref(false)
try {
  await load()
} catch {
  loadError.value = true
}
</script>

<template>
  <section class="materials container">
    <h1 class="materials__title">Материалы</h1>

    <p v-if="loadError" class="materials__state">Не удалось загрузить материалы. Попробуйте обновить страницу.</p>
    <p v-else-if="!materials.length" class="materials__state">Материалов пока нет.</p>

    <ul v-else class="materials__list">
      <li v-for="material in materials" :key="material.id" class="materials__item">
        <MaterialCard :material="material" />
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';
@import '~/assets/styles/breakpoints.less';

.materials {
  padding-block: var(--space-6);

  .mobile({
    padding-block: var(--space-5);
  });

  &__title {
    .text-h1();
  }

  &__item {
    display: flex; // карточка растягивается на всю ячейку сетки
  }

  &__state {
    .text-body();
    margin-top: var(--space-6);
    color: var(--color-gray);
  }

  &__list {
    display: grid;
    // 4 колонки по 276px на ширине контейнера; на узких экранах колонок меньше
    grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
    grid-auto-rows: 1fr; // все строки одной высоты, значит все карточки одинаковые
    gap: var(--grid-gap);
    padding: 0;
    margin: var(--space-6) 0 0;
    list-style: none;

    // на мобильных одна колонка, карточки на всю ширину
    .mobile({
      grid-template-columns: 1fr;
      margin-top: var(--space-5);
    });
  }
}
</style>
