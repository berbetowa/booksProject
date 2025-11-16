<template>
  <div class="empty-screen">
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()
</script>

<style scoped lang="scss">
.empty-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 3rem;

  .icon-wrapper {
    width: 120px;
    height: 120px;
    background: linear-gradient(to bottom right, #dbeafe, #ede9fe);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    :deep(svg) {
      width: 60px;
      height: 60px;
      color: #6366f1;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
}
</style>
