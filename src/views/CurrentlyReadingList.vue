<template>
  <div class="currently-reading">
    <div class="header">
      <h1>Читаю сейчас</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>

    <div v-if="books.length === 0" class="books-grid">
      <EmptyScreen
          title="Нет книг в процессе чтения"
          message="Добавьте книгу, которую сейчас читаете"
      >
        <template #icon>
          <BookOpen />
        </template>
        <template #action>
          <AddButton @click="addBook">Добавить первую книгу</AddButton>
        </template>
      </EmptyScreen>
    </div>

    <div v-else class="books-grid">
      <div
          v-for="book in books"
          :key="book.id"
          class="book-card"
          @mouseenter="book.showActions = true"
          @mouseleave="book.showActions = false"
      >
        <div class="book-content">
          <div class="book-cover-wrapper">
            <div class="book-cover">
              <img v-if="book.cover" :src="book.cover" :alt="book.title" />
              <Image v-else class="placeholder-icon" />
            </div>
            <button class="upload-cover-btn" :class="{ visible: book.showActions }">
              <Image :size="16" />
            </button>
          </div>

          <div class="book-details">
            <div class="book-header">
              <div class="book-info">
                <h3>{{ book.title }}</h3>
                <p class="author">{{ book.author }}</p>
              </div>

              <div v-if="book.showActions" class="action-buttons">
                <button class="action-btn edit" @click="editBook(book)">
                  <Edit3 :size="16" />
                </button>
                <button class="action-btn complete" @click="markAsRead(book)">
                  <Check :size="16" />
                </button>
                <button class="action-btn delete" @click="deleteBook(book)">
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>

            <div class="progress-section">
              <div class="progress-info">
                <span class="progress-label">
                  <Clock :size="14" />
                  Прогресс чтения
                </span>
                <span class="progress-value">{{ book.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div
                    class="progress-fill"
                    :style="{ width: book.progress + '%' }"
                ></div>
              </div>
            </div>

            <div v-if="book.startDate" class="start-date">
              Начата: {{ book.startDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, Image, Clock, Edit3, Check, Trash2 } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

interface Book {
  id: number
  title: string
  author: string
  progress: number
  startDate: string
  cover: string | null
  showActions?: boolean
}

const books = ref<Book[]>([
  {
    id: 1,
    title: 'Война и мир',
    author: 'Лев Толстой',
    progress: 45,
    startDate: '15 окт 2024',
    cover: null,
    showActions: false
  },
  {
    id: 2,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    progress: 72,
    startDate: '03 ноя 2024',
    cover: null,
    showActions: false
  },
  {
    id: 3,
    title: '1984',
    author: 'Джордж Оруэлл',
    progress: 28,
    startDate: '20 ноя 2024',
    cover: null,
    showActions: false
  },
  {
    id: 4,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    progress: 63,
    startDate: '01 ноя 2024',
    cover: null,
    showActions: false
  },
])

const addBook = () => console.log('Add book')
const editBook = (book: Book) => console.log('Edit book', book)
const markAsRead = (book: Book) => console.log('Mark as read', book)
const deleteBook = (book: Book) => {
  const index = books.value.findIndex(b => b.id === book.id)
  if (index > -1) books.value.splice(index, 1)
}
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

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #93c5fd;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.book-content {
  display: flex;
  gap: 1.25rem;
}

.book-cover-wrapper {
  position: relative;
  flex-shrink: 0;
}

.book-cover {
  width: 6rem;
  height: 8rem;
  background: linear-gradient(to bottom right, #e2e8f0, #cbd5e1);
  border-radius: 0.75rem;
  border: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-icon {
    width: 2rem;
    height: 2rem;
    color: #94a3b8;
  }
}

.book-card:hover .book-cover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.upload-cover-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }
}

.book-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.book-info {
  flex: 1;
  min-width: 0;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.3s ease;
  }

  .author {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
  }
}

.book-card:hover .book-info h3 {
  color: #2563eb;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  animation: fadeInSlide 0.3s ease;
}

@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &.edit {
    background: #eff6ff;
    color: #2563eb;

    &:hover {
      background: #dbeafe;
      transform: scale(1.1);
    }
  }

  &.complete {
    background: #f0fdf4;
    color: #16a34a;

    &:hover {
      background: #dcfce7;
      transform: scale(1.1);
    }
  }

  &.delete {
    background: #fef2f2;
    color: #dc2626;

    &:hover {
      background: #fee2e2;
      transform: scale(1.1);
    }
  }
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;

  .progress-label {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .progress-value {
    color: #2563eb;
    font-size: 0.875rem;
  }
}

.progress-bar {
  position: relative;
  height: 0.625rem;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #3b82f6, #9333ea);
    border-radius: 9999px;
    transition: width 0.5s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
}

.start-date {
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>