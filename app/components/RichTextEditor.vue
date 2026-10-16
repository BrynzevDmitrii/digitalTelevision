<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'

// Компонент отдаёт наружу содержимое редактора сразу в двух форматах, оба уходят на сервер.
// Родитель подключает их так: <RichTextEditor v-model:html="..." v-model:json="..." />
// defineModel создаёт «двустороннюю» переменную: когда мы пишем в html.value,
// родитель получает новое значение в своё поле.
const html = defineModel<string>('html', { default: '' })
const json = defineModel<Record<string, unknown>>('json', { default: () => ({}) })

// useEditor создаёт сам редактор (объект Tiptap). Он появляется только в браузере,
// после монтирования компонента, поэтому сначала editor.value равно null.
const editor = useEditor({
  extensions: [
    // StarterKit: набор базовых возможностей (абзац, заголовки, цитата и т.д.).
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Placeholder.configure({ placeholder: 'Введите текст…' }),
  ],
  // Класс rich-text даёт оформление заголовков и цитаты, как у контента на детальной странице.
  // Блок с этим классом Tiptap создаёт сам внутри <EditorContent>.
  editorProps: { attributes: { class: 'rich-text editor__content' } },
  // onCreate: редактор только что создан, onUpdate: пользователь изменил текст.
  // В обоих случаях копируем актуальное содержимое в html и json.
  onCreate: ({ editor }) => sync(editor),
  onUpdate: ({ editor }) => sync(editor),
})

function sync(instance: { getHTML: () => string; getJSON: () => Record<string, unknown> }) {
  html.value = instance.getHTML()
  json.value = instance.getJSON()
}

onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <!-- v-if: пока editor равен null (сервер и первый кадр в браузере), ничего не рисуем -->
  <div v-if="editor" class="editor">
    <div class="editor__toolbar" role="toolbar" aria-label="Форматирование">
      <button type="button" :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()">
        Текст
      </button>
      <!-- Три кнопки H1, H2, H3 из одного цикла; toggle включает заголовок и выключает его повторным кликом -->
      <button v-for="level in ([1, 2, 3] as const)" :key="level" type="button"
        :class="{ 'is-active': editor.isActive('heading', { level }) }"
        @click="editor.chain().focus().toggleHeading({ level }).run()">
        H{{ level }}
      </button>
      <button type="button" :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()">
        Цитата
      </button>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="less" scoped>
@import '~/assets/styles/typography.less';

.editor {
  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-3);

    button {
      .text-card();
      padding: var(--space-1) var(--space-3);
      color: var(--color-bright-blue);
      background: var(--color-light-blue);
      border-radius: var(--radius-button);
      transition: background-color 0.2s;

      &:hover,
      &.is-active {
        background: var(--color-light-blue-active);
      }
    }
  }

  :deep(.editor__content) {
    min-height: 240px;
    outline: none;
  }

  :deep(.editor__content p.is-editor-empty:first-child::before) {
    float: left;
    height: 0;
    color: var(--color-light-gray);
    pointer-events: none;
    content: attr(data-placeholder);
  }
}
</style>
