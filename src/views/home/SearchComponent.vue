<template>
    <div class="search-wrapper">
        <div class="search-box">

            <!-- Search Bar -->
            <div class="search-bar">

                <!-- FROM -->
                <div class="field-wrapper">
                    <div class="field-inner">
                        <span class="field-label">From</span>
                        <input v-model="fromQuery" @focus="showFromDropdown = true" @blur="closeFrom" type="text"
                            placeholder="City or airport" class="field-input" />
                    </div>
                    <ul v-if="showFromDropdown && filteredFrom.length" class="dropdown no-scrollbar">
                        <li v-for="city in filteredFrom" :key="city" @mousedown.prevent="selectFrom(city)"
                            class="dropdown-item">
                            <MapPin class="dropdown-icon" />
                            <span class="dropdown-text">{{ city }}</span>
                        </li>
                    </ul>
                </div>

                <!-- SWAP -->
                <div class="swap-wrapper">
                    <div class="divider divider-left"></div>
                    <button @click="swapLocations" class="swap-btn">
                        <ArrowLeftRight :class="{ 'swap-icon--rotated': swapped }" class="swap-icon" />
                    </button>
                    <div class="divider divider-right"></div>
                </div>

                <!-- TO -->
                <div class="field-wrapper">
                    <div class="field-inner">
                        <span class="field-label">To</span>
                        <input v-model="toQuery" @focus="showToDropdown = true" @blur="closeTo" type="text"
                            placeholder="City or airport" class="field-input" />
                    </div>
                    <ul v-if="showToDropdown && filteredTo.length" class="dropdown no-scrollbar">
                        <li v-for="city in filteredTo" :key="city" @mousedown.prevent="selectTo(city)"
                            class="dropdown-item">
                            <MapPin class="dropdown-icon" />
                            <span class="dropdown-text">{{ city }}</span>
                        </li>
                    </ul>
                </div>

                <!-- SEARCH BUTTON -->
                <button @click="handleSearch" class="search-btn">
                    <Search class="search-btn-icon" />
                    Search
                </button>
            </div>

            <!-- Error -->
            <p v-if="errorMsg" class="error-msg">
                <TriangleAlert class="error-icon" />
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

function closeFrom() { showFromDropdown.value = false }
function closeTo() { showToDropdown.value = false }

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
    selectedStates.value.source = fromQuery.value
    selectedStates.value.destination = toQuery.value
}
</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Wrapper — sits on top of hero overlay */
.search-wrapper {
    position: relative;
    z-index: 20;
    width: 100%;
    max-width: 80rem;
    padding: 1rem;
}

/* Dark card */
.search-box {
    background-color: var(--color-primary-color);
    border-radius: 0.5rem;
    padding: 1.5rem 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

@media (min-width: 640px) {
    .search-box {
        padding: 2.5rem 1rem;
    }
}

/* ── Search bar row ── */
.search-bar {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.75rem;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

@media (min-width: 640px) {
    .search-bar {
        flex-direction: row;
        align-items: stretch;
        min-height: 64px;
    }
}

/* ── Field ── */
.field-wrapper {
    position: relative;
    flex: 1;
    min-width: 0;
}

.field-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.75rem 1rem;
    height: 100%;
    cursor: text;
    transition: background-color 0.15s ease;
    border-radius: 0.75rem;
}

/* Remove border-radius on sides when horizontal */
@media (min-width: 640px) {
    .field-wrapper:first-child .field-inner {
        border-radius: 0.75rem 0 0 0.75rem;
    }

    .field-wrapper:not(:first-child) .field-inner {
        border-radius: 0;
    }
}

.field-inner:hover {
    background-color: #f9fafb;
}

.field-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--color-primary-grey);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 3px;
    line-height: 1;
}

@media (min-width: 640px) {
    .field-label {
        font-size: 11px;
    }
}

.field-input {
    width: 100%;
    font-size: 0.875rem;
    font-weight: 600;
    color: #000;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    line-height: 1.4;
    font-family: inherit;
}

.field-input::placeholder {
    color: var(--color-primary-grey);
    font-weight: 400;
}

/* ── Dropdown ── */
.dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 50;
    width: 100%;
    min-width: 14rem;
    background-color: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    border: 1px solid #e5e7eb;
    overflow-y: auto;
    max-height: 13rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

@media (min-width: 640px) {
    .dropdown {
        width: 16rem;
    }
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    cursor: pointer;
    transition: background-color 0.12s;
}

.dropdown-item:hover {
    background-color: #eff6ff;
}

.dropdown-icon {
    width: 1rem;
    height: 1rem;
    color: rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
}

.dropdown-text {
    font-size: 0.875rem;
    color: #1f2937;
    font-weight: 500;
}

/* ── Swap button ── */
.swap-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
    /* Mobile: horizontal divider between from/to */
    padding: 0.5rem 1rem;
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
    .swap-wrapper {
        border: none;
        padding: 0 0.25rem;
    }
}

.divider {
    display: none;
    position: absolute;
    top: 0.75rem;
    bottom: 0.75rem;
    width: 1px;
    background-color: #e5e7eb;
}

@media (min-width: 640px) {
    .divider {
        display: block;
    }
}

.divider-left {
    left: 0;
}

.divider-right {
    right: 0;
}

.swap-btn {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    color: var(--color-primary-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
    /* Vertical on mobile */
    transform: rotate(90deg);
}

@media (min-width: 640px) {
    .swap-btn {
        transform: rotate(0deg);
    }
}

.swap-btn:hover {
    background-color: #f3f4f6;
}

.swap-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s;
}

@media (min-width: 640px) {
    .swap-icon {
        width: 1.5rem;
        height: 1.5rem;
    }
}

.swap-icon--rotated {
    transform: rotate(180deg);
}

/* ── Search button ── */
.search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--color-primary-blue);
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 0 0 0.75rem 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    font-family: inherit;
}

@media (min-width: 640px) {
    .search-btn {
        width: auto;
        flex-shrink: 0;
        padding: 0 2rem;
        border-radius: 0 0.75rem 0.75rem 0;
        align-self: stretch;
    }
}

.search-btn:hover {
    background-color: #0051c3;
}

.search-btn:active {
    transform: scale(0.97);
}

.search-btn-icon {
    width: 1rem;
    height: 1rem;
}

/* ── Error ── */
.error-msg {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #f87171;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.error-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}
</style>