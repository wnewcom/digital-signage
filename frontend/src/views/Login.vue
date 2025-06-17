<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-600">
          <ComputerDesktopIcon class="h-6 w-6 text-white" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Digital Signage
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your displays and content
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="credentials.username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div class="bg-gray-100 rounded-md p-4">
          <p class="text-sm text-gray-600 text-center">
            Demo credentials:<br />
            Username: <strong>demo</strong><br />
            Password: <strong>demo</strong>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import { ComputerDesktopIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Login',
  components: {
    ComputerDesktopIcon,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    const credentials = ref({
      username: '',
      password: '',
    })
    const loading = ref(false)

    const handleLogin = async () => {
      loading.value = true
      try {
        await authStore.login(credentials.value)
        notificationStore.success('Login successful', 'Welcome back!')
        router.push('/')
      } catch (error) {
        notificationStore.error(
          'Login failed',
          error.response?.data?.message || 'Invalid credentials'
        )
      } finally {
        loading.value = false
      }
    }

    return {
      credentials,
      loading,
      handleLogin,
    }
  },
}
</script>