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
