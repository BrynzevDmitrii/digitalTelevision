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
  }>(),
  { size: 24 },
)

const svg = computed(() => icons[`../assets/icons/${props.name}.svg`] ?? '')

const sizePx = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <span class="icon" :style="{ '--icon-size': sizePx }" aria-hidden="true" v-html="svg" />
</template>

<style lang="less" scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
