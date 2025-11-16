<template>
  <div id="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">
            <BookOpen />
          </div>
          <div class="logo-text">
            <h1>BOOKS</h1>
            <p>Project</p>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-item">
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BookOpen, TrendingUp, Calendar, Heart, BookMarked, CheckCircle } from 'lucide-vue-next'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: TrendingUp },
  { path: '/reading', label: 'Currently Reading', icon: BookOpen },
  { path: '/plans', label: 'Plans', icon: Calendar },
  { path: '/wishlist', label: 'Wish List', icon: Heart },
  { path: '/unread', label: 'Unread Books', icon: BookMarked },
  { path: '/read', label: 'Read', icon: CheckCircle },
]
</script>

<style lang="scss">
@import './assets/scss/global.scss';
</style>
