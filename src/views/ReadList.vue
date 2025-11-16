<template>
  <div class="read-list">
    <div class="header">
      <h1>Прочитанные книги</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>
    <EmptyScreen
      v-if="books.length === 0"
      title="Нет прочитанных книг"
      message="Отметьте книги, которые уже прочитали"
    >
      <template #icon>
        <CheckCircle />
      </template>
    </EmptyScreen>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

const books = ref([])
const addBook = () => console.log('Add book')
</script>

<style scoped lang="scss">
.read-list {
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
    background: linear-gradient(to right, #16a34a, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>