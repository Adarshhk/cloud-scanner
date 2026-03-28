<template>
    <div>
        <div class="hero">
            <div class="hero-overlay" />
            <SearchComponent />
        </div>

        <SearchResults />
    </div>
</template>

<script setup>
import SearchComponent from './SearchComponent.vue';
import SearchResults from './SearchResults.vue';
</script>

<style scoped>
.hero {
    background-image: url('/img/hero-bg.webp');
    height: 40vh;
    width: 100%;
    background-size: contain;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (min-width: 768px) {
    .hero {
        background-size: cover;
    }
}

.hero-overlay {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>