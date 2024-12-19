<template>
  <div class="p-5">home</div>
  <el-button @click="goToTest">go to test</el-button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTest = () => {
  router.push('/test')
}
</script>
<style scoped></style>
