<template>
  <div class="wishlist">
    <div class="header">
      <h1>Список желаний</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>

    <div v-if="books.length === 0">
      <EmptyScreen
          title="Список желаний пуст"
          message="Добавьте книги, которые хотите прочитать"
      >
        <template #icon>
          <Heart />
        </template>
        <template #action>
          <AddButton @click="addBook">Добавить книгу</AddButton>
        </template>
      </EmptyScreen>
    </div>

    <div v-else class="books-grid">
      <div
          v-for="book in books"
          :key="book.id"
          class="book-card"
      >
        <div class="book-content">
          <div class="book-cover">
            <img v-if="book.cover" :src="book.cover" :alt="book.title" />
            <Heart v-else class="placeholder-icon" />
          </div>

          <div class="book-details">
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
            </div>

            <div class="action-buttons">
              <button class="action-btn primary" @click="moveToUnread(book)">
                В непрочитанные
              </button>
              <button class="action-btn secondary" @click="editBook(book)">
                <Edit3 :size="16" />
              </button>
              <button class="action-btn delete" @click="deleteBook(book)">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Heart, Edit3, Trash2 } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

interface WishlistBook {
  id: number
  title: string
  author: string
  cover: string | null
}

const books = ref<WishlistBook[]>([
  {
    id: 1,
    title: 'Улисс',
    author: 'Джеймс Джойс',
    cover: null
  },
  {
    id: 2,
    title: 'В поисках утраченного времени',
    author: 'Марсель Пруст',
    cover: null
  },
  {
    id: 3,
    title: 'Божественная комедия',
    author: 'Данте Алигьери',
    cover: null
  },
  {
    id: 4,
    title: 'Илиада',
    author: 'Гомер',
    cover: null
  },
  {
    id: 5,
    title: 'Дон Кихот',
    author: 'Мигель де Сервантес',
    cover: null
  },
  {
    id: 6,
    title: 'Фауст',
    author: 'Иоганн Вольфганг фон Гёте',
    cover: null
  },
  {
    id: 7,
    title: 'Моби Дик',
    author: 'Герман Мелвилл',
    cover: null
  },
  {
    id: 8,
    title: 'Граф Монте-Кристо',
    author: 'Александр Дюма',
    cover: null
  },
])

const addBook = () => console.log('Add book')
const moveToUnread = (book: WishlistBook) => console.log('Move to unread', book)
const editBook = (book: WishlistBook) => console.log('Edit book', book)
const deleteBook = (book: WishlistBook) => {
  const index = books.value.findIndex(b => b.id === book.id)
  if (index > -1) books.value.splice(index, 1)
}
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

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #f9a8d4;
    box-shadow: 0 10px 15px -3px rgba(219, 39, 119, 0.1);
    transform: translateY(-2px);
  }
}

.book-content {
  display: flex;
  gap: 1rem;
}

.book-cover {
  width: 5rem;
  height: 7rem;
  background: linear-gradient(to bottom right, #fce7f3, #fae8ff);
  border-radius: 0.5rem;
  border: 2px solid #f9a8d4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #ec4899;
  }
}

.book-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-info {
  h3 {
    font-size: 1.125rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .author {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
  }
}

.book-card:hover .book-info h3 {
  color: #db2777;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.3s ease;
}

.book-card:hover .action-buttons {
  opacity: 1;
  transform: translateY(0);
}

.action-btn {
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &.primary {
    flex: 1;
    padding: 0.5rem 1rem;
    background: #fdf2f8;
    color: #db2777;

    &:hover {
      background: #fce7f3;
      transform: scale(1.02);
    }
  }

  &.secondary {
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: #fdf2f8;
    color: #db2777;

    &:hover {
      background: #fce7f3;
      transform: scale(1.1);
    }
  }

  &.delete {
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: #fef2f2;
    color: #dc2626;

    &:hover {
      background: #fee2e2;
      transform: scale(1.1);
    }
  }
}
</style>