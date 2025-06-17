import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await api.post('/auth/login/', credentials)
      user.value = response.data.user
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout/')
      user.value = null
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me/')
      user.value = response.data
    } catch (error) {
      user.value = null
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  }
})