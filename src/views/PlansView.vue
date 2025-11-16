<template>
  <div class="plans">
    <h1>Планы</h1>
    <div class="plans-container">
      <div class="tabs">
        <button @click="activeTab = 'year'" :class="['tab', { active: activeTab === 'year' }]">
          <TrendingUp />
          Планы на год
        </button>
        <button @click="activeTab = 'month'" :class="['tab', { active: activeTab === 'month' }]">
          <Calendar />
          Планы на месяц
        </button>
      </div>
      <div class="plans-content">
        <button class="add-plan-button">
          <div class="icon-circle">
            <Plus />
          </div>
          Добавить новый план
        </button>
        <div class="plans-list">
          <div class="plan-item" v-for="(plan, index) in currentPlans" :key="index">
            <div class="checkbox"></div>
            <span class="plan-text">{{ plan }}</span>
            <button class="delete-button">
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, Calendar, Plus, Trash2 } from 'lucide-vue-next'

const activeTab = ref('year')
const yearPlans = ref([
  'Прочитать 50 книг',
  'Изучить классическую русскую литературу'
])
const monthPlans = ref([
  'Закончить "Войну и мир"',
  'Прочитать 2 книги по психологии'
])

const currentPlans = computed(() => {
  return activeTab.value === 'year' ? yearPlans.value : monthPlans.value
})
</script>

<style scoped lang="scss">
.plans {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    font-size: 2.25rem;
    font-weight: bold;
    background: linear-gradient(to right, #1e293b, #475569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.plans-container {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem 2rem;
  border: none;
  background: none;
  font-size: 1.125rem;
  font-weight: bold;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &.active {
    background: linear-gradient(to right, #eff6ff, #faf5ff);
    color: #2563eb;
    border-bottom: 4px solid #2563eb;
  }

  &:not(.active):hover {
    background: #f8fafc;
  }
}

.plans-content {
  padding: 2rem;
}

.add-plan-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: 3px dashed #cbd5e1;
  border-radius: 1rem;
  background: none;
  color: #475569;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  .icon-circle {
    width: 2.5rem;
    height: 2.5rem;
    background: #dbeafe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #2563eb;
    }
  }

  &:hover {
    border-color: #60a5fa;
    color: #2563eb;
    background: #eff6ff;

    .icon-circle {
      background: #93c5fd;
    }
  }
}

.plans-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(to right, #f8fafc, white);
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #eff6ff, #faf5ff);
    border-color: #93c5fd;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .checkbox {
    width: 1.75rem;
    height: 1.75rem;
    border: 3px solid #94a3b8;
    border-radius: 50%;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #3b82f6;
      background: #eff6ff;
    }
  }

  .plan-text {
    flex: 1;
    color: #334155;
    font-weight: 600;
    font-size: 1.125rem;
  }

  .delete-button {
    opacity: 0;
    padding: 0.625rem;
    background: none;
    border: none;
    border-radius: 0.75rem;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }

  &:hover .delete-button {
    opacity: 1;
  }
}
</style>