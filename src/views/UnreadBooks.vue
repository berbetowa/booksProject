<template>
  <div class="unread">
    <div class="header">
      <h1>Непрочитанные книги</h1>
      <AddButton @click="addBook">Добавить книгу</AddButton>
    </div>

    <div v-if="books.length === 0">
      <EmptyScreen
          title="Нет непрочитанных книг"
          message="Добавьте книги, которые планируете прочитать"
      >
        <template #icon>
          <BookMarked />
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
            <BookMarked v-else class="placeholder-icon" />
          </div>

          <div class="book-details">
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
              <span v-if="book.isPurchased" class="purchased-badge"> Куплено в {{ book.purchaseMonth }}</span>
            </div>

            <div class="action-buttons">
              <button class="action-btn primary" @click="startReading(book)">
                Начать читать
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
import { ref, onMounted, onUnmounted } from 'vue'
import { BookMarked, Edit3, Trash2 } from 'lucide-vue-next'
import AddButton from '@/components/AddButton.vue'
import EmptyScreen from '@/components/EmptyScreen.vue'

interface UnreadBook {
  id: number
  title: string
  author: string
  cover: string | null
  isPurchased?: boolean
  purchaseMonth?: string
}

const books = ref<UnreadBook[]>([
  {
    id: 1,
    title: 'Братья Карамазовы',
    author: 'Фёдор Достоевский',
    cover: null
  },
  {
    id: 2,
    title: 'Идиот',
    author: 'Фёдор Достоевский',
    cover: null
  },
  {
    id: 3,
    title: 'Улисс',
    author: 'Джеймс Джойс',
    cover: null
  },
  {
    id: 4,
    title: 'Сто лет одиночества',
    author: 'Габриэль Гарсиа Маркес',
    cover: null
  },
  {
    id: 5,
    title: 'Процесс',
    author: 'Франц Кафка',
    cover: null
  },
])

onMounted(() => {
  loadPurchasedBooks()
  window.addEventListener('bookPurchased', handleBookPurchased as EventListener)
})

const loadPurchasedBooks = () => {
  const stored = localStorage.getItem('purchasedBooks')
  if (stored) {
    try {
      const purchasedBooks = JSON.parse(stored)

      purchasedBooks.forEach((purchasedBook: any) => {
        const exists = books.value.find(b =>
            b.title === purchasedBook.title && b.author === purchasedBook.author
        )

        if (!exists) {
          books.value.unshift({
            id: purchasedBook.id,
            title: purchasedBook.title,
            author: purchasedBook.author,
            cover: purchasedBook.cover,
            isPurchased: true,
            purchaseMonth: getMonthName(purchasedBook.month)
          })
        }
      })
    } catch (e) {
      console.error('Error loading purchased books:', e)
    }
  }
}

onUnmounted(() => {
  window.removeEventListener('bookPurchased', handleBookPurchased as EventListener)
})

const handleBookPurchased = (event: CustomEvent) => {
  const purchasedBook = event.detail

  const exists = books.value.find(b =>
      b.title === purchasedBook.title && b.author === purchasedBook.author
  )

  if (!exists) {
    books.value.unshift({
      id: purchasedBook.id,
      title: purchasedBook.title,
      author: purchasedBook.author,
      cover: purchasedBook.cover,
      isPurchased: true,
      purchaseMonth: getMonthName(purchasedBook.month)
    })
  }
}

const getMonthName = (monthStr: string) => {
  const months = [
    'январе', 'феврале', 'марте', 'апреле', 'мае', 'июне',
    'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'
  ]
  const monthIndex = parseInt(monthStr.split('-')[1]) - 1
  return months[monthIndex]
}


const addBook = () => console.log('Add book')
const startReading = (book: UnreadBook) => console.log('Start reading', book)
const editBook = (book: UnreadBook) => console.log('Edit book', book)
const deleteBook = (book: UnreadBook) => {
  const index = books.value.findIndex(b => b.id === book.id)
  if (index > -1) {
    books.value.splice(index, 1)

    if (book.isPurchased) {
      const stored = localStorage.getItem('purchasedBooks')
      if (stored) {
        try {
          const purchasedBooks = JSON.parse(stored)
          const filtered = purchasedBooks.filter((pb: any) => pb.id !== book.id)
          localStorage.setItem('purchasedBooks', JSON.stringify(filtered))
        } catch (e) {
          console.error('Error updating purchased books:', e)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.unread {
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
    background: linear-gradient(to right, #2563eb, #06b6d4);
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
    border-color: #93c5fd;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(to bottom right, #dbeafe, #e0f2fe);
  border-radius: 0.5rem;
  border: 2px solid #bfdbfe;
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
    color: #60a5fa;
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
  position: relative;

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
    margin-bottom: 0.5rem;
  }

  .purchased-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.625rem;
    background: linear-gradient(to right, #fef3c7, #fde68a);
    border: 1px solid #fbbf24;
    border-radius: 0.375rem;
    font-size: 0.625rem;
    font-weight: 700;
    color: #92400e;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.book-card:hover .book-info h3 {
  color: #2563eb;
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
    background: #eff6ff;
    color: #2563eb;

    &:hover {
      background: #dbeafe;
      transform: scale(1.02);
    }
  }

  &.secondary {
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: #eff6ff;
    color: #2563eb;

    &:hover {
      background: #dbeafe;
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