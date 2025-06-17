<template>
  <div
    v-if="notification.show"
    class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    :class="notificationClasses"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component :is="iconComponent" class="h-6 w-6" :class="iconClasses" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
          <p v-if="notification.message" class="mt-1 text-sm text-gray-500">
            {{ notification.message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="hideNotification"
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Notification',
  components: {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
  },
  setup() {
    const notificationStore = useNotificationStore()

    const iconComponent = computed(() => {
      switch (notificationStore.notification.type) {
        case 'success':
          return CheckCircleIcon
        case 'warning':
          return ExclamationTriangleIcon
        case 'error':
          return XCircleIcon
        default:
          return InformationCircleIcon
      }
    })

    const iconClasses = computed(() => {
      switch (notificationStore.notification.type) {
        case 'success':
          return 'text-green-400'
        case 'warning':
          return 'text-yellow-400'
        case 'error':
          return 'text-red-400'
        default:
          return 'text-blue-400'
      }
    })

    const notificationClasses = computed(() => {
      switch (notificationStore.notification.type) {
        case 'success':
          return 'border-l-4 border-green-400'
        case 'warning':
          return 'border-l-4 border-yellow-400'
        case 'error':
          return 'border-l-4 border-red-400'
        default:
          return 'border-l-4 border-blue-400'
      }
    })

    return {
      notification: notificationStore.notification,
      hideNotification: notificationStore.hide,
      iconComponent,
      iconClasses,
      notificationClasses,
    }
  },
}
</script>