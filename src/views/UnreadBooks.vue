<template>
  <div class="unread">
    <div class="header">
      <h1>Непрочитанные книги</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>
    <EmptyScreen
      v-if="books.length === 0"
      title="Нет непрочитанных книг"
      message="Добавьте книги, которые планируете прочитать"
    >
      <template #icon>
        <BookMarked />
      </template>
    </EmptyScreen>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookMarked } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

const books = ref([])
const addBook = () => console.log('Add book')
</script>

<style scoped lang="scss">
.unread {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 2.25rem;
    font-weight: bold;
    background: linear-gradient(to right, #2563eb, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>