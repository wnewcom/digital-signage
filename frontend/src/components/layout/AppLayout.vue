<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col">
      <div class="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
        <div class="flex items-center flex-shrink-0 px-4">
          <ComputerDesktopIcon class="h-8 w-8 text-primary-600" />
          <h1 class="ml-2 text-xl font-bold text-gray-900">Digital Signage</h1>
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  $route.path === item.href ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                ]"
              />
              {{ item.name }}
            </router-link>
          </nav>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              @click="handleLogout"
              class="flex-shrink-0 w-full group block"
            >
              <div class="flex items-center">
                <div>
                  <ArrowRightOnRectangleIcon class="inline-block h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Logout
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  ComputerDesktopIcon,
  HomeIcon,
  PresentationChartLineIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'AppLayout',
  components: {
    ComputerDesktopIcon,
    HomeIcon,
    PresentationChartLineIcon,
    ArrowRightOnRectangleIcon,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const navigation = [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      { name: 'Displays', href: '/displays', icon: ComputerDesktopIcon },
      { name: 'Slideshows', href: '/slideshows', icon: PresentationChartLineIcon },
    ]

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/login')
    }

    return {
      navigation,
      handleLogout,
    }
  },
}
</script>