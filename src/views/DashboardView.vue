<template>
  <div class="dashboard">
    <div class="goal-section">
      <div class="goal-content">
        <div class="goal-header">
          <Target />
          <h3>Цель на 2025 год</h3>
        </div>
        <p class="goal-text">Прочитать 50 книг</p>
        <div class="goal-progress">
          <div class="goal-fill" style="width: 46%"></div>
        </div>
        <p class="goal-stats">23 из 50 книг прочитано • <strong>46%</strong></p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-content">
          <div :class="['stat-icon', stat.bg]">
            <component :is="stat.icon" :class="stat.color" />
          </div>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <div class="currently-reading-section">
      <div class="section-header">
        <div class="title-wrapper">
          <div class="title-icon">
            <BookOpen />
          </div>
          <h2>Читаю сейчас</h2>
        </div>
        <AddButton @click="addBook">Добавить книгу</AddButton>
      </div>

      <div class="reading-grid">
        <div class="reading-item" v-for="book in currentlyReading" :key="book.id">
          <div class="book-info">
            <div class="book-cover">
              <Image v-if="!book.cover" />
            </div>
            <div class="book-details">
              <h3>{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
              <div class="progress-info">
                <span class="progress-label">
                  <Clock />
                  Прогресс чтения
                </span>
                <span class="progress-value">{{ book.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: book.progress + '%' }"></div>
              </div>
              <div class="start-date">Начата: {{ book.startDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, Clock, Target, CheckCircle, Heart, Star, Image } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'

const stats = ref([
  { label: 'Прочитано в 2025', value: '23', icon: CheckCircle, color: 'text-green', bg: 'bg-green' },
  { label: 'Читаю сейчас', value: '3', icon: BookOpen, color: 'text-blue', bg: 'bg-blue' },
  { label: 'В списке желаний', value: '47', icon: Heart, color: 'text-pink', bg: 'bg-pink' },
  { label: 'Средняя оценка', value: '4.3', icon: Star, color: 'text-yellow', bg: 'bg-yellow' },
])

const currentlyReading = ref([
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', progress: 45, startDate: '15 окт 2024', cover: null },
  { id: 2, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', progress: 72, startDate: '03 ноя 2024', cover: null },
  { id: 3, title: '1984', author: 'Джордж Оруэлл', progress: 28, startDate: '20 ноя 2024', cover: null },
])

const addBook = () => {
  console.log('Add book')
}
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #bfdbfe;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.bg-green { background: #f0fdf4; }
  &.bg-blue { background: #eff6ff; }
  &.bg-pink { background: #fdf2f8; }
  &.bg-yellow { background: #fefce8; }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .text-green { color: #16a34a; }
  .text-blue { color: #2563eb; }
  .text-pink { color: #db2777; }
  .text-yellow { color: #ca8a04; }
}

.stat-value {
  font-size: 2.25rem;
  font-weight: bold;
  background: linear-gradient(to right, #334155, #0f172a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
}

.currently-reading-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to bottom right, #3b82f6, #9333ea);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
}

.section-header h2 {
  font-size: 1.875rem;
  font-weight: bold;
  background: linear-gradient(to right, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.reading-grid {
  display: grid;
  gap: 1.25rem;
}

.reading-item {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #93c5fd;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.book-info {
  display: flex;
  gap: 1.25rem;
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
  flex-shrink: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  svg {
    width: 2rem;
    height: 2rem;
    color: #94a3b8;
  }
}

.book-details {
  flex: 1;
  min-width: 0;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .author {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
    margin-bottom: 1rem;
  }
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;

  .progress-label {
    display: flex;
    align-items: center;
    gap: 0.375rem;

    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }

  .progress-value {
    color: #2563eb;
  }
}

.progress-bar {
  position: relative;
  height: 0.625rem;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.75rem;

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #3b82f6, #9333ea);
    border-radius: 9999px;
    transition: width 0.5s ease;
  }
}

.start-date {
  font-size: 0.75rem;
  color: #64748b;
}

.goal-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom right, #4f46e5, #7c3aed, #ec4899);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.goal-content {
  position: relative;
  z-index: 1;
}

.goal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: white;
  }

  h3 {
    font-size: 1.875rem;
    font-weight: bold;
    color: white;
  }
}

.goal-text {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.goal-progress {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  height: 1.25rem;
  overflow: hidden;
  backdrop-filter: blur(4px);
  margin-bottom: 1rem;

  .goal-fill {
    height: 100%;
    background: linear-gradient(to right, white, #fef08a);
    border-radius: 9999px;
    transition: width 0.5s ease;
  }
}

.goal-stats {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  strong {
    color: white;
    font-weight: bold;
  }
}
</style>
