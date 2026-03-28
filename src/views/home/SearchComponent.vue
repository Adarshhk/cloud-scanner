<template>
    <div class="max-w-7xl z-20 w-full p-4">
        <div class="bg-primary-color rounded-lg py-6 sm:py-10 px-3 sm:px-4 shadow-2xl">

            <!-- Search Bar -->
            <div class="flex flex-col sm:flex-row items-stretch bg-white rounded-xl overflow-visible shadow-sm ">

                <!-- FROM -->
                <div class="relative flex-1 min-w-0">
                    <div
                        class="flex flex-col justify-center px-4 sm:px-5 py-3 h-full hover:bg-gray-50 transition-colors duration-150">
                        <span
                            class="text-[10px] sm:text-[11px] font-semibold text-primary-grey uppercase tracking-wide mb-0.5">
                            From
                        </span>
                        <input v-model="fromQuery" @focus="showFromDropdown = true" @blur="closeFrom" type="text"
                            placeholder="City or airport"
                            class="w-full text-sm font-semibold text-black bg-transparent outline-none placeholder:text-primary-grey placeholder:font-normal" />
                    </div>

                    <ul v-if="showFromDropdown && filteredFrom.length"
                        class="absolute top-full left-0 z-50 mt-1 w-full sm:w-64 bg-white rounded-xl shadow-xl border border-primary-border overflow-hidden max-h-52 overflow-y-auto">
                        <li v-for="city in filteredFrom" :key="city" @mousedown.prevent="selectFrom(city)"
                            class="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                            <MapPin class="w-4 text-black/60" />
                            <span class="text-sm text-gray-800 font-medium">{{ city }}</span>
                        </li>
                    </ul>
                </div>

                <!-- SWAP -->
                <div
                    class="flex border-y border-primary-grey sm:border-0 items-center justify-center shrink-0 relative z-10 py-2 sm:py-0 sm:px-1">

                    <!-- divider lines -->
                    <div class="hidden sm:block absolute left-0 top-3 bottom-3 w-px bg-gray-200"></div>

                    <button @click="swapLocations"
                        class="w-9 h-9 rounded-full text-primary-blue flex items-center justify-center transition-all duration-200 shadow-sm rotate-90 sm:rotate-0">
                        <ArrowLeftRight :class="{ 'rotate-180': swapped }"
                            class="w-6 sm:w-8 transition-transform duration-300" />
                    </button>

                    <div class="hidden sm:block absolute right-0 top-3 bottom-3 w-px bg-gray-200"></div>
                </div>

                <!-- TO -->
                <div class="relative flex-1 min-w-0">
                    <div
                        class="flex flex-col justify-center px-4 sm:px-5 py-3 h-full hover:bg-gray-50 transition-colors duration-150">
                        <span
                            class="text-[10px] sm:text-[11px] font-semibold text-primary-grey uppercase tracking-wide mb-0.5">
                            To
                        </span>
                        <input v-model="toQuery" @focus="showToDropdown = true" @blur="closeTo" type="text"
                            placeholder="City or airport"
                            class="w-full text-sm font-semibold text-black bg-transparent outline-none placeholder:text-primary-grey placeholder:font-normal" />
                    </div>

                    <ul v-if="showToDropdown && filteredTo.length"
                        class="absolute top-full left-0 z-50 mt-1 w-full sm:w-64 bg-white rounded-xl shadow-xl border border-primary-border overflow-hidden max-h-52 overflow-y-auto">
                        <li v-for="city in filteredTo" :key="city" @mousedown.prevent="selectTo(city)"
                            class="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                            <MapPin class="w-4 text-black/60" />
                            <span class="text-sm text-gray-800 font-medium">{{ city }}</span>
                        </li>
                    </ul>
                </div>

                <!-- SEARCH BUTTON -->
                <button @click="handleSearch"
                    class="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue/80 text-white font-bold text-sm px-6 sm:px-8 py-3 sm:py-0 rounded-b-xl sm:rounded-none sm:rounded-r-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95">
                    <Search class="w-4" />
                    Search
                </button>
            </div>

            <!-- Error -->
            <p v-if="errorMsg" class="mt-3 text-sm text-red-400 font-medium flex items-center gap-1.5">
                <TriangleAlert class="w-4" />
                {{ errorMsg }}
            </p>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFlightStore } from '@/store/flights'
import { storeToRefs } from 'pinia'
import { ArrowLeftRight, MapPin, Search, TriangleAlert } from '@lucide/vue'
import { useRouter } from 'vue-router'

const flightStore = useFlightStore()
const router = useRouter()
const { states, selectedStates } = storeToRefs(flightStore)

const fromQuery = ref('')
const toQuery = ref('')
const showFromDropdown = ref(false)
const showToDropdown = ref(false)
const swapped = ref(false)
const errorMsg = ref('')

const filteredFrom = computed(() =>
    states.value.filter(
        city =>
            city !== toQuery.value &&
            city.toLowerCase().includes(fromQuery.value.toLowerCase())
    )
)

const filteredTo = computed(() =>
    states.value.filter(
        city =>
            city !== fromQuery.value &&
            city.toLowerCase().includes(toQuery.value.toLowerCase())
    )
)

function closeFrom() {
    showFromDropdown.value = false
}

function closeTo() {
    showToDropdown.value = false
}

function selectFrom(city) {
    fromQuery.value = city
    showFromDropdown.value = false
    errorMsg.value = ''
}

function selectTo(city) {
    toQuery.value = city
    showToDropdown.value = false
    errorMsg.value = ''
}

function swapLocations() {
    swapped.value = !swapped.value
    const temp = fromQuery.value
    fromQuery.value = toQuery.value
    toQuery.value = temp
    errorMsg.value = ''
}

function handleSearch() {
    errorMsg.value = ''

    if (!fromQuery.value || !toQuery.value) {
        errorMsg.value = 'Please select both a source and destination city.'
        return
    }

    if (fromQuery.value.toLowerCase() === toQuery.value.toLowerCase()) {
        errorMsg.value = 'Source and destination cannot be the same city.'
        return
    }

    selectedStates.value.source = fromQuery.value;
    selectedStates.value.destination = toQuery.value;
}
</script>

<style scoped></style>