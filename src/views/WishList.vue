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


<style scoped lang="scss">
.wishlist {
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
    background: linear-gradient(to right, #db2777, #9333ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>