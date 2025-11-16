import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    currentlyReading: [],
    wishlist: [],
    unread: [],
    read: []
  })
})
