<script setup lang="ts">
// Если передан to, рендерится ссылка, иначе обычная кнопка.
// Слот icon: на мобильных текст скрывается, остаётся квадратная кнопка с иконкой.
withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { type: 'button' },
)

const NuxtLink = resolveComponent('NuxtLink')
const hasIcon = !!useSlots().icon
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled"
    class="button"
    :class="{ 'button--with-icon': hasIcon }"
  >
    <span class="button__text"><slot /></span>
    <span v-if="hasIcon" class="button__icon"><slot name="icon" /></span>
  </component>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';
@import '~/assets/styles/breakpoints.less';

.button {
  .text-button();
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px var(--space-4);
  color: var(--color-bright-blue);
  white-space: nowrap;
  background: var(--color-light-blue);
  border-radius: var(--radius-button);
  transition: background-color 0.2s;

  &:hover,
  &:focus-visible,
  &:active {
    background: var(--color-light-blue-active);
  }

  &:disabled {
    pointer-events: none;
    background: var(--color-light-blue);
  }

  &__icon {
    display: none;
  }

  .mobile({
    &--with-icon {
      width: 48px;
      height: 48px;
      padding: 0;
    }

    &--with-icon &__text {
      // скрыт визуально, но остаётся доступным для скринридеров
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }

    &--with-icon &__icon {
      display: inline-flex;
    }
  });
}
</style>
