<script setup lang="ts">
// Сохраняет форму со страницы создания: сама форма должна иметь id="material-form".
const saving = useState<boolean>('materialSaving', () => false)
</script>

<template>
  <BaseButton type="submit" form="material-form" :disabled="saving">
    Сохранить
    <template #icon><AppIcon name="send" /></template>
  </BaseButton>
</template>
