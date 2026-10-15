<template>
  <div class="demo">
    <NuxtRouteAnnouncer />
    <h1>Цифровое Телевидение</h1>
    <p class="date"><AppIcon name="calendar" :size="16" /> 21 сентября</p>
    <AppIcon name="left-arrow" :size="20" />
    <AppIcon name="send" />
  </div>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';

.demo {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-4);

  h1 {
    .text-h1();
  }
}

.date {
  .text-card-date();
  display: flex;
  gap: var(--space-2);
  align-items: center;
  color: var(--color-light-gray);
}
</style>
