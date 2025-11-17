<template>
  <div class="read-list">
    <div class="header">
      <h1>Прочитанные книги</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>

    <div v-if="books.length === 0">
      <EmptyScreen
          title="Нет прочитанных книг"
          message="Отметьте книги, которые уже прочитали"
      >
        <template #icon>
          <CheckCircle />
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
          <div class="book-cover-wrapper">
            <div class="book-cover">
              <img v-if="book.cover" :src="book.cover" :alt="book.title" />
              <BookOpen v-else class="placeholder-icon" />
            </div>
            <div class="completed-badge">
              <Check :size="14" />
            </div>
          </div>

          <div class="book-details">
            <div class="book-header">
              <div class="book-info">
                <h3>{{ book.title }}</h3>
                <p class="author">{{ book.author }}</p>

                <div class="rating">
                  <Star
                      v-for="star in 5"
                      :key="star"
                      :class="['star', { filled: star <= book.rating }]"
                      :size="16"
                  />
                  <span class="rating-value">{{ book.rating }}.0</span>
                </div>
              </div>

              <button class="more-btn">
                <MoreVertical :size="20" />
              </button>
            </div>

            <div v-if="book.review" class="review-section">
              <p class="review-text">"{{ book.review }}"</p>
            </div>

            <div class="meta-info">
              <div class="meta-item">
                <Clock :size="14" />
                <span>{{ book.readingTime }}</span>
              </div>
              <div class="meta-item">
                <Calendar :size="14" />
                <span>Закончена: {{ book.finishDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle, BookOpen, Check, Star, MoreVertical, Clock, Calendar } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

interface ReadBook {
  id: number
  title: string
  author: string
  rating: number
  review: string
  readingTime: string
  finishDate: string
  cover: string | null
}

const books = ref<ReadBook[]>([
  {
    id: 1,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    rating: 5,
    review: 'Невероятная глубина психологического анализа. Раскольников - один из самых сложных персонажей в литературе.',
    readingTime: '2 недели 3 дня',
    finishDate: '10 окт 2024',
    cover: null
  },
  {
    id: 2,
    title: 'Анна Каренина',
    author: 'Лев Толстой',
    rating: 4,
    review: 'Прекрасное произведение о любви, семье и обществе. Местами затянуто, но стоит прочтения.',
    readingTime: '3 недели 1 день',
    finishDate: '25 сен 2024',
    cover: null
  },
  {
    id: 3,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    rating: 5,
    review: 'Шедевр русской литературы. Многослойный, философский, захватывающий роман.',
    readingTime: '2 недели 5 дней',
    finishDate: '15 сен 2024',
    cover: null
  },
  {
    id: 4,
    title: 'Идиот',
    author: 'Фёдор Достоевский',
    rating: 5,
    review: 'Князь Мышкин - удивительный персонаж. Глубокое исследование доброты и человечности.',
    readingTime: '3 недели',
    finishDate: '01 сен 2024',
    cover: null
  },
  {
    id: 5,
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    rating: 4,
    review: 'Классика в стихах. Красивый язык, вечные темы любви и судьбы.',
    readingTime: '1 неделя 4 дня',
    finishDate: '20 авг 2024',
    cover: null
  },
  {
    id: 6,
    title: 'Братья Карамазовы',
    author: 'Фёдор Достоевский',
    rating: 5,
    review: 'Монументальное произведение о вере, морали и человеческой природе.',
    readingTime: '4 недели 2 дня',
    finishDate: '10 авг 2024',
    cover: null
  },
])

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

  &:hover {
    border-color: #c084fc;
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
  background: linear-gradient(to bottom right, #e9d5ff, #fbcfe8);
  border-radius: 0.75rem;
  border: 2px solid #d8b4fe;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-icon {
    width: 2rem;
    height: 2rem;
    color: #c084fc;
  }
}

.completed-badge {
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 1.75rem;
  height: 1.75rem;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.4);
}

.book-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
    transition: color 0.3s ease;
  }

  .author {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }
}

.book-card:hover .book-info h3 {
  color: #9333ea;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .star {
    color: #cbd5e1;
    transition: all 0.2s ease;

    &.filled {
      color: #facc15;
      fill: #facc15;
    }
  }

  .rating-value {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #334155;
  }
}

.more-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  color: #94a3b8;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }
}

.book-card:hover .more-btn {
  opacity: 1;
}

.review-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem;

  .review-text {
    font-size: 0.875rem;
    color: #334155;
    font-style: italic;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #64748b;

  svg {
    color: #94a3b8;
  }
}
</style>