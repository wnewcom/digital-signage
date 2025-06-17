import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref({
    show: false,
    type: 'info',
    title: '',
    message: '',
  })

  const show = (type, title, message = '') => {
    notification.value = {
      show: true,
      type,
      title,
      message,
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
      hide()
    }, 5000)
  }

  const hide = () => {
    notification.value.show = false
  }

  const success = (title, message) => show('success', title, message)
  const error = (title, message) => show('error', title, message)
  const warning = (title, message) => show('warning', title, message)
  const info = (title, message) => show('info', title, message)

  return {
    notification,
    show,
    hide,
    success,
    error,
    warning,
    info,
  }
})