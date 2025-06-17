<template>
  <div class="min-h-screen bg-gray-50">
    <AppLayout>
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="mt-1 text-sm text-gray-600">
              Manage your digital signage displays and content
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <ComputerDesktopIcon class="h-6 w-6 text-gray-400" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Displays
                      </dt>
                      <dd class="text-lg font-medium text-gray-900">
                        {{ displays.length }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <PresentationChartLineIcon class="h-6 w-6 text-gray-400" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Slideshows
                      </dt>
                      <dd class="text-lg font-medium text-gray-900">
                        {{ slideshows.length }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <SignalIcon class="h-6 w-6 text-green-400" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Online Displays
                      </dt>
                      <dd class="text-lg font-medium text-gray-900">
                        {{ displays.filter(d => d.is_active).length }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Displays -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Recent Displays
                </h3>
                <router-link
                  to="/displays"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </router-link>
              </div>
              
              <div v-if="loading" class="text-center py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
              
              <div v-else-if="displays.length === 0" class="text-center py-8">
                <ComputerDesktopIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No displays</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Get started by creating a new display.
                </p>
                <div class="mt-6">
                  <router-link
                    to="/displays"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
                    New Display
                  </router-link>
                </div>
              </div>
              
              <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="display in displays.slice(0, 6)"
                  :key="display.id"
                  class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                >
                  <div class="flex-shrink-0">
                    <ComputerDesktopIcon class="h-10 w-10 text-primary-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <router-link :to="`/displays/${display.id}/layout`" class="focus:outline-none">
                      <span class="absolute inset-0" />
                      <p class="text-sm font-medium text-gray-900">
                        {{ display.name }}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {{ display.description || 'No description' }}
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDisplayStore } from '@/stores/displays'
import AppLayout from '@/components/layout/AppLayout.vue'
import {
  ComputerDesktopIcon,
  PresentationChartLineIcon,
  SignalIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'Dashboard',
  components: {
    AppLayout,
    ComputerDesktopIcon,
    PresentationChartLineIcon,
    SignalIcon,
    PlusIcon,
  },
  setup() {
    const displayStore = useDisplayStore()
    const slideshows = ref([])
    const loading = ref(true)

    onMounted(async () => {
      try {
        await displayStore.fetchDisplays()
        // TODO: Fetch slideshows
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      displays: displayStore.displays,
      slideshows,
      loading,
    }
  },
}
</script>