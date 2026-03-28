<template>
    <div class="flight-card">

        <!-- Top Row (Mobile) / Left Section -->
        <div class="flight-left">

            <!-- Airline Info -->
            <div class="airline-info">
                <div class="airline-icon-wrap">
                    <PlaneTakeoff class="airline-icon" size="20" />
                </div>
                <div>
                    <p class="airline-name">{{ flight.company }}</p>
                    <p class="airline-stops">
                        {{ flight.segment.length === 1
                            ? 'Direct'
                            : `${flight.segment.length - 1} stop${flight.segment.length > 2 ? 's' : ''}` }}
                    </p>
                </div>
            </div>

            <!-- Points (Mobile) -->
            <div class="points-mobile">
                <p class="points-value">{{ flight.points.toLocaleString() }}</p>
                <p class="points-label">points</p>
            </div>
        </div>

        <!-- Timeline -->
        <div class="timeline">

            <!-- Departure -->
            <div class="time-block">
                <p class="time-value">{{ formatTime(flight.segment[0].departureTime) }}</p>
                <p class="time-city">{{ flight.segment[0].origin }}</p>
            </div>

            <!-- Path -->
            <div class="path">
                <p class="path-duration">{{ formatDuration(flight.duration) }}</p>

                <div class="path-line-row">
                    <div class="path-dot"></div>

                    <div class="path-line">
                        <template v-if="flight.segment.length > 1">
                            <div v-for="(_, i) in flight.segment.slice(1)" :key="i" class="stop-dot"
                                :style="{ left: `${((i + 1) / flight.segment.length) * 100}%`, transform: 'translate(-50%, -50%)' }">
                            </div>
                        </template>
                    </div>

                    <PlaneLanding class="path-landing" size="12" />
                </div>

                <!-- Stops -->
                <div v-if="flight.segment.length > 1" class="stop-badges">
                    <span v-for="(seg, i) in flight.segment.slice(0, -1)" :key="i" class="stop-badge">
                        {{ seg.destination }}
                    </span>
                </div>
            </div>

            <!-- Arrival -->
            <div class="time-block">
                <p class="time-value">{{ formatTime(lastSegment.arrivalTime) }}</p>
                <p class="time-city">{{ lastSegment.destination }}</p>
            </div>
        </div>

        <!-- Points (Desktop) -->
        <div class="points-desktop">
            <p class="points-value">{{ flight.points.toLocaleString() }}</p>
            <p class="points-label">points</p>
        </div>
    </div>
</template>

<script setup>
import { PlaneLanding, PlaneTakeoff } from '@lucide/vue'

const props = defineProps({
    flight: { type: Object, required: true }
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

<style scoped>
.flight-card {
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: box-shadow 0.2s;
}

.flight-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (min-width: 640px) {
    .flight-card {
        padding: 1.25rem;
    }
}

@media (min-width: 1024px) {
    .flight-card {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}

/* Left section */
.flight-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
}

@media (min-width: 1024px) {
    .flight-left {
        width: auto;
        justify-content: flex-start;
    }
}

/* Airline */
.airline-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

@media (min-width: 640px) {
    .airline-info {
        gap: 1rem;
    }
}

.airline-icon-wrap {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.75rem;
    background-color: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

@media (min-width: 640px) {
    .airline-icon-wrap {
        width: 2.5rem;
        height: 2.5rem;
    }
}

.airline-icon {
    color: var(--color-primary-blue);
}

.airline-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.25;
}

.airline-stops {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.125rem;
}

/* Points Mobile */
.points-mobile {
    text-align: right;
}

@media (min-width: 1024px) {
    .points-mobile {
        display: none;
    }
}

/* Points Desktop */
.points-desktop {
    display: none;
    text-align: right;
    flex-shrink: 0;
}

@media (min-width: 1024px) {
    .points-desktop {
        display: block;
    }
}

.points-value {
    font-size: 1.125rem;
    font-weight: 900;
    color: #2563eb;
}

@media (min-width: 1024px) {
    .points-value {
        font-size: 1.25rem;
    }
}

.points-label {
    font-size: 10px;
    color: #9ca3af;
}

@media (min-width: 1024px) {
    .points-label {
        font-size: 0.75rem;
        font-weight: 500;
    }
}

/* Timeline */
.timeline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    flex: 1;
    min-width: 0;
}

@media (min-width: 640px) {
    .timeline {
        gap: 0.75rem;
    }
}

.time-block {
    text-align: center;
    flex-shrink: 0;
}

.time-value {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
}

@media (min-width: 640px) {
    .time-value {
        font-size: 1.125rem;
    }
}

.time-city {
    font-size: 10px;
    color: #9ca3af;
    font-weight: 500;
    margin-top: 0.125rem;
}

@media (min-width: 640px) {
    .time-city {
        font-size: 0.75rem;
    }
}

/* Path */
.path {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
    padding: 0 0.25rem;
}

@media (min-width: 640px) {
    .path {
        padding: 0 0.5rem;
    }
}

.path-duration {
    font-size: 10px;
    color: #9ca3af;
    font-weight: 500;
}

@media (min-width: 640px) {
    .path-duration {
        font-size: 0.75rem;
    }
}

.path-line-row {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.path-dot {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 9999px;
    background-color: #d1d5db;
    flex-shrink: 0;
}

.path-line {
    flex: 1;
    position: relative;
    height: 1px;
    background-color: #e5e7eb;
}

.stop-dot {
    position: absolute;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: #fb923c;
    border: 2px solid #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.path-landing {
    color: var(--color-primary-blue);
}

/* Stop badges */
.stop-badges {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
}

.stop-badge {
    font-size: 9px;
    color: #f97316;
    font-weight: 500;
    background-color: #fff7ed;
    border-radius: 0.25rem;
    padding: 0.125rem 0.25rem;
}

@media (min-width: 640px) {
    .stop-badge {
        font-size: 10px;
    }
}
</style>