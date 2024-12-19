<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.back()
}
</script>

<template>
  <div>404</div>
  <el-button @click="goToHome">back to home</el-button>
</template>
