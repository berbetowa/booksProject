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
