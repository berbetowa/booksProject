<template>
  <div class="dashboard">
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
// Стили Dashboard - см. полную версию в документации
</style>
