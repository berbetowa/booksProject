<template>
  <div id="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <div class="logo-icon">
            <BookOpen/>
          </div>
          <div class="logo-text">
            <h1>BOOKS</h1>
            <p>Project</p>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-item">
          <component :is="item.icon"/>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {BookOpen, TrendingUp, Calendar, Heart, BookMarked, CheckCircle} from 'lucide-vue-next'

const menuItems = [
  {path: '/', label: 'Dashboard', icon: TrendingUp},
  {path: '/reading', label: 'Currently Reading', icon: BookOpen},
  {path: '/plans', label: 'Plans', icon: Calendar},
  {path: '/wishlist', label: 'Wish List', icon: Heart},
  {path: '/unread', label: 'Unread Books', icon: BookMarked},
  {path: '/read', label: 'Read', icon: CheckCircle},
]
</script>

<style lang="scss">
@use './assets/scss/global.scss' as *;


html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.sidebar {
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 50;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}


.sidebar-header {
  margin-bottom: 2.5rem;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to bottom right, #22d3ee, #3b82f6, #9333ea);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
  transform: rotate(6deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg);
  }

  svg {
    width: 1.75rem;
    height: 1.75rem;
    color: white;
    transform: rotate(-6deg);
  }
}

.logo-text {
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    line-height: 1;
  }

  p {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-weight: 500;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  flex-shrink: 0;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(51, 65, 85, 0.5);
    color: white;

    svg {
      transform: scale(1.1);
    }
  }

  &.router-link-active {
    background: linear-gradient(to right, #3b82f6, #9333ea);
    color: white;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);

    svg {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.sidebar-footer {
  padding-top: 1.5rem;
  border-top: 1px solid #334155;
  flex-shrink: 0;
}

.version-info {
  padding: 0.75rem 1rem;
  background: rgba(51, 65, 85, 0.5);
  border-radius: 0.75rem;

  p {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-bottom: 0.25rem;

    &.copyright {
      color: #64748b;
      margin-bottom: 0;
    }
  }
}

.main-content {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }

  .container {
    max-width: 1920px;
    margin: 0 auto;
  }
}
</style>