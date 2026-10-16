<script setup lang="ts">
const icons = import.meta.glob<string>('../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    // true: SVG вписывается в квадрат size (масштабируется), иначе остаётся своего размера
    fit?: boolean
  }>(),
  { size: 24, fit: false },
)

const svg = computed(() => icons[`../assets/icons/${props.name}.svg`] ?? '')

const sizePx = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <span
    class="icon"
    :class="{ 'icon--fit': fit }"
    :style="{ '--icon-size': sizePx }"
    aria-hidden="true"
    v-html="svg"
  />
</template>

<style lang="less" scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--icon-size);
  height: var(--icon-size);

  &--fit :deep(svg) {
    width: 100%;
    height: 100%;
  }
}
</style>
