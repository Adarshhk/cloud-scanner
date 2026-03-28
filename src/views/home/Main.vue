<template>
    <div>
        <div
            class="bg-[url('/img/hero-bg.webp')] h-[40vh] w-full bg-contain md:bg-cover bg-opactiy relative flex items-center justify-center">
            <div class="bg-black/60 z-10 absolute top-0 left-0 w-full h-full" />

            <SearchComponent />

        </div>

        <SearchResults />
    </div>
</template>

<script setup>
import SearchComponent from './SearchComponent.vue';
import SearchResults from './SearchResults.vue';


</script>

<style lang="scss" scoped></style>