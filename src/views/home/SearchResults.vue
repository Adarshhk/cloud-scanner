<template>
    <div class="min-h-[60vh] border-b border-primary-grey">

        <!-- Empty state -->
        <div v-if="!selectedStates.destination" class="flex h-[60vh] items-center justify-center">
            <div class="text-center">
                <Plane size="100" class="text-primary-grey/40 w-full" />
                <p class="font-semibold text-primary-grey text-xl">Select source and destination and hit search.</p>
            </div>
        </div>

        <!-- Results -->
        <div v-else class="max-w-4xl mx-auto px-4 py-8">

            <!-- Header -->
            <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h2 class="text-xl font-bold text-black">
                        {{ selectedStates.source }}
                        <span class="mx-2 text-primary-blue">→</span>
                        {{ selectedStates.destination }}
                    </h2>
                    <p class="text-sm text-primary-grey mt-0.5">
                        {{ filteredFlights.length }} flight{{ filteredFlights.length !== 1 ? 's' : '' }} found
                    </p>
                </div>

                <!-- Sort -->
                <div class="flex items-center gap-2">
                    <span class="text-xs text-primary-grey font-medium">Sort by</span>
                    <div class="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                        <button v-for="opt in sortOptions" :key="opt.value" @click="sortBy = opt.value" :class="[
                            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                            sortBy === opt.value
                                ? 'bg-white text-primary-blue shadow-sm'
                                : 'text-primary-grey hover:text-gray-700'
                        ]">
                            {{ opt.label }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Flight List -->
            <div v-if="filteredFlights.length" class="flex flex-col gap-3">
                <FlightRow v-for="flight in filteredFlights" :key="flight.id" :flight="flight" />
            </div>

            <!-- No results -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center">
                <Ban size="40" class="w-24 text-primary-grey/60 " />
                <p class="text-primary-grey font-semibold">No flights found for this route.</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFlightStore } from '@/store/flights'
import { storeToRefs } from 'pinia'
import FlightRow from './FlightRow.vue'
import { Ban, Plane, PlaneTakeoff } from '@lucide/vue'

const flightStore = useFlightStore()
const { selectedStates, flights } = storeToRefs(flightStore)

const sortBy = ref('duration')

const sortOptions = [
    { label: '⏱ Shortest', value: 'duration' },
    { label: '💎 Points', value: 'points' },
]

const filteredFlights = computed(() => {
    const src = selectedStates.value.source?.toLowerCase().trim()
    const dest = selectedStates.value.destination?.toLowerCase().trim()

    if (!src || !dest) return []

    let result = flights.value.filter(flight => {
        // first segment origin must match source
        const firstOrigin = flight.segment[0].origin.toLowerCase().trim()
        // any segment's destination must match the searched destination
        const hasMatchingDest = flight.segment.some(
            seg => seg.destination.toLowerCase().trim() === dest
        )
        return firstOrigin === src && hasMatchingDest
    })

    if (sortBy.value === 'duration') {
        result = [...result].sort((a, b) => a.duration - b.duration)
    } else if (sortBy.value === 'points') {
        result = [...result].sort((a, b) => a.points - b.points)
    }

    return result
})
</script>

<style scoped></style>