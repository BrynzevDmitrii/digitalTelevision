<script setup lang="ts">
defineProps<{ material: Material }>()
</script>

<template>
  <NuxtLink :to="`/materials/${material.id}`" class="card">
    <div class="card__date">
      <AppIcon name="calendar" size="var(--card-icon-size)" fit />
      <span>{{ formatMaterialDate(material.datetime) }}</span>
    </div>

    <div class="card__content">
      <h2 class="card__title">{{ material.title }}</h2>
      <p v-if="material.short_description" class="card__text">{{ material.short_description }}</p>
    </div>
  </NuxtLink>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';

.card {
  display: flex;
  flex: 1; // занимает всю высоту и ширину ячейки
  flex-direction: column;
  gap: var(--card-gap);
  padding: var(--card-padding-y) var(--card-padding-x);
  background: var(--color-white);
  border-radius: var(--radius);
  transition: box-shadow 0.2s;

  &:hover,
  &:focus-visible {
    box-shadow: var(--shadow-card-hover);
  }

  &__date {
    .text-card-date();
    display: flex;
    gap: var(--space-2);
    align-items: center;
    color: var(--color-light-gray);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--card-gap);
  }

  &__title {
    .text-h2();
    color: var(--color-black);
  }

  &__text {
    .text-card();
    color: var(--color-gray);

    // описание обрезается до 4 строк с многоточием
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
