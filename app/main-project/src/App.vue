<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/micro-vue">Micro-vue</RouterLink>
    <RouterLink to="/micro-react">Micro-react</RouterLink>

  </nav>

  <RouterView />
</template>
