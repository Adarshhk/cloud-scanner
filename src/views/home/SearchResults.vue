<template>
    <div class="results-container">

        <!-- Empty state -->
        <div v-if="!selectedStates.destination" class="empty-state">
            <div class="empty-inner">
                <Plane size="100" class="empty-icon" />
                <p class="empty-text">Select source and destination and hit search.</p>
            </div>
        </div>

        <!-- Results -->
        <div v-else class="results-content">

            <!-- Header -->
            <div class="results-header">
                <div>
                    <h2 class="results-title">
                        {{ selectedStates.source }}
                        <span class="results-arrow">→</span>
                        {{ selectedStates.destination }}
                    </h2>
                    <p class="results-count">
                        {{ filteredFlights.length }} flight{{ filteredFlights.length !== 1 ? 's' : '' }} found
                    </p>
                </div>

                <!-- Sort -->
                <div class="sort-wrapper">
                    <span class="sort-label">Sort by</span>
                    <div class="sort-pills">
                        <button v-for="opt in sortOptions" :key="opt.value" @click="sortBy = opt.value"
                            :class="['sort-pill', sortBy === opt.value ? 'sort-pill--active' : 'sort-pill--inactive']">
                            {{ opt.label }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Flight List -->
            <div v-if="filteredFlights.length" class="flight-list">
                <FlightRow v-for="flight in filteredFlights" :key="flight.id" :flight="flight" />
            </div>

            <!-- No results -->
            <div v-else class="no-results">
                <Ban size="40" class="no-results-icon" />
                <p class="no-results-text">No flights found for this route.</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFlightStore } from '@/store/flights'
import { storeToRefs } from 'pinia'
import FlightRow from './FlightRow.vue'
import { Ban, Plane } from '@lucide/vue'

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
        const firstOrigin = flight.segment[0].origin.toLowerCase().trim()
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

<style scoped>
.results-container {
    min-height: 60vh;
    border-bottom: 1px solid var(--color-primary-grey);
}

/* Empty state */
.empty-state {
    display: flex;
    height: 60vh;
    align-items: center;
    justify-content: center;
}

.empty-inner {
    text-align: center;
}

.empty-icon {
    color: rgba(98, 105, 113, 0.4);
    width: 100%;
}

.empty-text {
    font-weight: 600;
    color: var(--color-primary-grey);
    font-size: 1.25rem;
}

/* Results */
.results-content {
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.results-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
}

.results-arrow {
    margin: 0 0.5rem;
    color: var(--color-primary-blue);
}

.results-count {
    font-size: 0.875rem;
    color: var(--color-primary-grey);
    margin-top: 0.125rem;
}

/* Sort */
.sort-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sort-label {
    font-size: 0.75rem;
    color: var(--color-primary-grey);
    font-weight: 500;
}

.sort-pills {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: #f3f4f6;
    border-radius: 0.75rem;
    padding: 0.25rem;
}

.sort-pill {
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
}

.sort-pill--active {
    background-color: #fff;
    color: var(--color-primary-blue);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.sort-pill--inactive {
    color: var(--color-primary-grey);
}

.sort-pill--inactive:hover {
    color: #374151;
}

/* Flight list */
.flight-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* No results */
.no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 0;
    text-align: center;
}

.no-results-icon {
    width: 6rem;
    color: rgba(98, 105, 113, 0.6);
}

.no-results-text {
    color: var(--color-primary-grey);
    font-weight: 600;
}
</style>