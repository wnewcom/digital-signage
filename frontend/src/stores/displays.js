import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useDisplayStore = defineStore('displays', () => {
  const displays = ref([])
  const currentDisplay = ref(null)
  const loading = ref(false)

  const fetchDisplays = async () => {
    loading.value = true
    try {
      const response = await api.get('/display/')
      displays.value = response.data
    } catch (error) {
      console.error('Error fetching displays:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchDisplay = async (id) => {
    try {
      const response = await api.get(`/display/${id}/`)
      currentDisplay.value = response.data
      return response.data
    } catch (error) {
      console.error('Error fetching display:', error)
      throw error
    }
  }

  const createDisplay = async (data) => {
    try {
      const response = await api.post('/display/', data)
      displays.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Error creating display:', error)
      throw error
    }
  }

  const updateDisplay = async (id, data) => {
    try {
      const response = await api.patch(`/display/${id}/`, data)
      const index = displays.value.findIndex(d => d.id === id)
      if (index !== -1) {
        displays.value[index] = response.data
      }
      if (currentDisplay.value?.id === id) {
        currentDisplay.value = response.data
      }
      return response.data
    } catch (error) {
      console.error('Error updating display:', error)
      throw error
    }
  }

  const deleteDisplay = async (id) => {
    try {
      await api.delete(`/display/${id}/`)
      displays.value = displays.value.filter(d => d.id !== id)
      if (currentDisplay.value?.id === id) {
        currentDisplay.value = null
      }
    } catch (error) {
      console.error('Error deleting display:', error)
      throw error
    }
  }

  return {
    displays,
    currentDisplay,
    loading,
    fetchDisplays,
    fetchDisplay,
    createDisplay,
    updateDisplay,
    deleteDisplay,
  }
})