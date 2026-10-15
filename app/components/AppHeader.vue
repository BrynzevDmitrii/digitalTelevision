<script setup lang="ts">
import type { Component } from 'vue'
import HeaderCreateAction from '~/components/header/HeaderCreateAction.vue'
import HeaderSaveAction from '~/components/header/HeaderSaveAction.vue'
import logoDesktop from '~/assets/icons/Logo.svg'
import logoMobile from '~/assets/icons/Logo-mobile.svg'

// Какая кнопка в хедере, задаётся на странице: definePageMeta({ headerAction: 'save' })
type HeaderAction = 'create' | 'save'

const actions: Record<HeaderAction, Component> = {
  create: HeaderCreateAction,
  save: HeaderSaveAction,
}

const route = useRoute()
const action = computed(() => actions[(route.meta.headerAction as HeaderAction | undefined) ?? 'create'])
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <NuxtLink to="/" class="header__logo" aria-label="Моя планета, на главную">
        <picture>
          <source media="(max-width: 744px)" :srcset="logoMobile" />
          <img :src="logoDesktop" alt="Моя планета" />
        </picture>
      </NuxtLink>

      <component :is="action" />
    </div>
  </header>
</template>

<style lang="less" scoped>
@import '~/assets/styles/breakpoints.less';

.header {
  background: var(--color-white);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
  }

  &__logo img {
    width: auto;
    height: 44px;

    .mobile({
      height: 36px;
    });
  }
}
</style>
