<script setup lang="ts">
withDefaults(defineProps<{ to?: string }>(), { to: '/' })
</script>

<template>
  <NuxtLink :to="to" class="back-link">
    <AppIcon name="left-arrow" :size="19" />
    <span><slot>Назад</slot></span>
  </NuxtLink>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';

.back-link {
  .text-card();
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  color: var(--color-black);
  transition: color 0.2s;

  &:hover,
  &:focus-visible,
  &:active {
    color: var(--color-bright-blue);
  }
}
</style>
