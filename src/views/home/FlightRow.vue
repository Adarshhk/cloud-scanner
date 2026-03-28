<template>
    <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-4 sm:p-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        <!-- Top Row (Mobile) / Left Section -->
        <div class="flex items-center justify-between lg:justify-start w-full lg:w-auto gap-4">

            <!-- Airline Info -->
            <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <PlaneTakeoff class="text-primary-blue" size="20" />
                </div>
                <div>
                    <p class="text-sm font-bold text-gray-900 leading-tight">
                        {{ flight.company }}
                    </p>
                    <p class="text-xs text-gray-400 mt-0.5">
                        {{ flight.segment.length === 1
                            ? 'Direct'
                            : `${flight.segment.length - 1} stop${flight.segment.length > 2 ? 's' : ''}` }}
                    </p>
                </div>
            </div>

            <!-- Points (Mobile Top Right) -->
            <div class="text-right lg:hidden">
                <p class="text-lg font-black text-blue-600">
                    {{ flight.points.toLocaleString() }}
                </p>
                <p class="text-[10px] text-gray-400">points</p>
            </div>
        </div>

        <!-- Timeline -->
        <div class="flex items-center gap-2 sm:gap-3 w-full flex-1 min-w-0">

            <!-- Departure -->
            <div class="text-center shrink-0">
                <p class="text-base sm:text-lg font-bold text-gray-900">
                    {{ formatTime(flight.segment[0].departureTime) }}
                </p>
                <p class="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                    {{ flight.segment[0].origin }}
                </p>
            </div>

            <!-- Path -->
            <div class="flex-1 flex flex-col items-center gap-1 min-w-0 px-1 sm:px-2">
                <p class="text-[10px] sm:text-xs text-gray-400 font-medium">
                    {{ formatDuration(flight.duration) }}
                </p>

                <div class="w-full flex items-center gap-1">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></div>

                    <div class="flex-1 relative h-px bg-gray-200">
                        <template v-if="flight.segment.length > 1">
                            <div v-for="(_, i) in flight.segment.slice(1)" :key="i"
                                class="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 border-2 border-white shadow-sm"
                                :style="{ left: `${((i + 1) / flight.segment.length) * 100}%`, transform: 'translate(-50%, -50%)' }">
                            </div>
                        </template>
                    </div>

                    <PlaneLanding class="text-primary-blue" size="12" />
                </div>

                <!-- Stops -->
                <div v-if="flight.segment.length > 1" class="flex gap-1 flex-wrap justify-center max-w-full">
                    <span v-for="(seg, i) in flight.segment.slice(0, -1)" :key="i"
                        class="text-[9px] sm:text-[10px] text-orange-500 font-medium bg-orange-50 rounded px-1 py-0.5">
                        {{ seg.destination }}
                    </span>
                </div>
            </div>

            <!-- Arrival -->
            <div class="text-center shrink-0">
                <p class="text-base sm:text-lg font-bold text-gray-900">
                    {{ formatTime(lastSegment.arrivalTime) }}
                </p>
                <p class="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                    {{ lastSegment.destination }}
                </p>
            </div>
        </div>

        <!-- Points (Desktop Right) -->
        <div class="hidden lg:block text-right shrink-0">
            <p class="text-xl font-black text-blue-600">
                {{ flight.points.toLocaleString() }}
            </p>
            <p class="text-xs text-gray-400 font-medium">points</p>
        </div>
    </div>
</template>

<script setup>
import { PlaneLanding, PlaneTakeoff } from '@lucide/vue'

const props = defineProps({
    flight: {
        type: Object,
        required: true
    }
})

const lastSegment = props.flight.segment[props.flight.segment.length - 1]

function formatTime(isoString) {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
}
</script>