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
