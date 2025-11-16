<template>
  <div class="wishlist">
    <div class="header">
      <h1>Список желаний</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>
    <EmptyScreen
      v-if="books.length === 0"
      title="Список желаний пуст"
      message="Добавьте книги, которые хотите прочитать"
    >
      <template #icon>
        <Heart />
      </template>
    </EmptyScreen>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

const books = ref([])
const addBook = () => console.log('Add book')
</script>
