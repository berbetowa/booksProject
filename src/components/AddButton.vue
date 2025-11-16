<template>
  <button
    @click="$emit('click')"
    class="add-button"
  >
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background: linear-gradient(to right, #2563eb, #7e22ce);
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
    transform: scale(1.05);
  }
}
</style>
