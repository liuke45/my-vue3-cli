<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.back()
}
</script>

<template>
  <div>
    <div>Test Page</div>
    <el-button @click="goToHome">back to home</el-button>
  </div>
</template>
