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

    <!-- Виджет купленных книг -->
    <div class="purchased-books-section">
      <div class="section-header">
        <div class="title-wrapper">
          <div class="title-icon purchased">
            <ShoppingBag />
          </div>
          <div>
            <h2>Мои покупки</h2>
            <p class="subtitle">{{ purchasedBooks.length }} {{ bookWord(purchasedBooks.length) }}</p>
          </div>
        </div>
        <AddButton @click="showAddPurchasedModal = true">Добавить книгу</AddButton>
      </div>

      <div v-if="purchasedBooks.length === 0" class="empty-purchased">
        <Package class="empty-icon" />
        <p>В этом месяце вы ещё не купили ни одной книги</p>
      </div>

      <div v-else class="purchased-grid">
        <div
            v-for="book in purchasedBooks"
            :key="book.id"
            class="purchased-book-card"
        >
          <div class="book-badge">
            <Calendar :size="12" />
            {{ book.purchaseDate }}
          </div>

          <div class="book-cover mini">
            <img v-if="book.cover" :src="book.cover" :alt="book.title" />
            <ShoppingBag v-else :size="20" />
          </div>

          <div class="book-info-mini">
            <h4>{{ book.title }}</h4>
            <p class="author-mini">{{ book.author }}</p>
          </div>

          <div class="book-actions-mini">
            <button
                class="action-btn-mini start"
                @click="startReading(book)"
                title="Начать читать"
            >
              <BookOpen :size="14" />
            </button>
            <button
                class="action-btn-mini delete"
                @click="deletePurchasedBook(book)"
                title="Удалить"
            >
              <Trash2 :size="14" />
            </button>
          </div>
        </div>
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

    <!-- Модальное окно для добавления купленной книги -->
    <div v-if="showAddPurchasedModal" class="modal-overlay" @click.self="showAddPurchasedModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Добавить купленную книгу</h3>
          <button class="close-btn" @click="showAddPurchasedModal = false">
            <X :size="20" />
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Название книги</label>
            <input
                v-model="newPurchasedBook.title"
                type="text"
                placeholder="Введите название"
                class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Автор</label>
            <input
                v-model="newPurchasedBook.author"
                type="text"
                placeholder="Введите автора"
                class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Дата покупки (опционально)</label>
            <input
                v-model="newPurchasedBook.purchaseDate"
                type="date"
                class="form-input"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="showAddPurchasedModal = false">
            Отмена
          </button>
          <button class="btn-primary" @click="addPurchasedBook">
            Добавить книгу
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BookOpen, Clock, Target, CheckCircle, Heart, Star, Image,
  ShoppingBag, Calendar, Package, Trash2, X
} from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'

interface PurchasedBook {
  id: number
  title: string
  author: string
  purchaseDate: string
  cover: string | null
  month: string
}

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

const purchasedBooks = ref<PurchasedBook[]>([])

const showAddPurchasedModal = ref(false)
const newPurchasedBook = ref({
  title: '',
  author: '',
  purchaseDate: new Date().toISOString().split('T')[0]
})
const bookWord = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return 'книга'
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'книги'
  return 'книг'
}

onMounted(() => {
  const stored = localStorage.getItem('purchasedBooks')
  if (stored) {
    try {
      const allPurchased = JSON.parse(stored)
      purchasedBooks.value = allPurchased
    } catch (e) {
      console.error('Error loading purchased books:', e)
    }
  }
})

const addPurchasedBook = () => {
  if (!newPurchasedBook.value.title || !newPurchasedBook.value.author) {
    alert('Пожалуйста, заполните название и автора')
    return
  }

  const date = new Date(newPurchasedBook.value.purchaseDate)
  const purchaseMonth = date.toISOString().slice(0, 7)

  const book: PurchasedBook = {
    id: Date.now(),
    title: newPurchasedBook.value.title,
    author: newPurchasedBook.value.author,
    purchaseDate: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    cover: null,
    month: purchaseMonth
  }

  purchasedBooks.value.push(book)

  const stored = localStorage.getItem('purchasedBooks')
  const allPurchased = stored ? JSON.parse(stored) : []
  allPurchased.push(book)
  localStorage.setItem('purchasedBooks', JSON.stringify(allPurchased))

  const event = new CustomEvent('bookPurchased', { detail: book })
  window.dispatchEvent(event)

  newPurchasedBook.value = {
    title: '',
    author: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  }
  showAddPurchasedModal.value = false
}

const deletePurchasedBook = (book: PurchasedBook) => {
  const index = purchasedBooks.value.findIndex(b => b.id === book.id)
  if (index > -1) {
    purchasedBooks.value.splice(index, 1)

    const stored = localStorage.getItem('purchasedBooks')
    if (stored) {
      const allPurchased = JSON.parse(stored)
      const filtered = allPurchased.filter((b: PurchasedBook) => b.id !== book.id)
      localStorage.setItem('purchasedBooks', JSON.stringify(filtered))
    }
  }
}

const startReading = (book: PurchasedBook) => {
  console.log('Start reading:', book)
}

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

.purchased-books-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
}

.title-icon.purchased {
  background: linear-gradient(to bottom right, #f59e0b, #d97706);

  svg {
    color: white;
  }
}

.subtitle {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.25rem;
}

.empty-purchased {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;

  .empty-icon {
    width: 4rem;
    height: 4rem;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  p {
    color: #64748b;
    font-size: 0.875rem;
  }
}

.purchased-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.purchased-book-card {
  position: relative;
  background: linear-gradient(to bottom right, #fffbeb, #fef3c7);
  border: 2px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.2);
  }
}

.book-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border: 1px solid #fbbf24;
  border-radius: 0.375rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 600;
  color: #92400e;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.book-cover.mini {
  width: 3.5rem;
  height: 5rem;
  background: linear-gradient(to bottom right, #fef3c7, #fde68a);
  border-radius: 0.5rem;
  border: 2px solid #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #d97706;
  }
}

.book-info-mini {
  flex: 1;
  min-width: 0;
  padding-right: 2rem;

  h4 {
    font-size: 0.875rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.3;
  }

  .author-mini {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
  }
}

.book-actions-mini {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.375rem;
}

.action-btn-mini {
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &.start {
    background: #dbeafe;
    color: #2563eb;

    &:hover {
      background: #bfdbfe;
      transform: scale(1.1);
    }
  }

  &.delete {
    background: #fee2e2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
      transform: scale(1.1);
    }
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;
  }

  .close-btn {
    width: 2rem;
    height: 2rem;
    border: none;
    background: #f1f5f9;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #64748b;
    transition: all 0.3s ease;

    &:hover {
      background: #e2e8f0;
      color: #1e293b;
    }
  }
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    color: #1e293b;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;

  &:hover {
    background: #e2e8f0;
  }
}

.btn-primary {
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
    transform: translateY(-1px);
  }
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