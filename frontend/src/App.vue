<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
    <Notification />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Notification from '@/components/ui/Notification.vue'

export default {
  name: 'App',
  components: {
    Notification,
  },
  setup() {
    const authStore = useAuthStore()

    onMounted(() => {
      authStore.checkAuth()
    })

    return {}
  },
}
</script>