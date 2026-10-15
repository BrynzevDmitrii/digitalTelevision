<template>
  <section class="materials container">
    <h1 class="materials__title">Материалы</h1>
  </section>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';

.materials {
  padding-block: var(--space-6);

  &__title {
    .text-h1();
  }
}
</style>
