<template>
  <div class="currently-reading">
    <div class="header">
      <h1>Читаю сейчас</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>
    <div class="books-grid">
      <EmptyScreen
        v-if="books.length === 0"
        title="Нет книг в процессе чтения"
        message="Добавьте книгу, которую сейчас читаете"
      >
        <template #icon>
          <BookOpen />
        </template>
      </EmptyScreen>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

const books = ref([])
const addBook = () => console.log('Add book')
</script>

<style scoped lang="scss">
.currently-reading {
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
    background: linear-gradient(to right, #1e293b, #475569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>