<template>
    <div class="w-full bg-primary-color px-4 py-3">
        <div class="max-w-7xl w-full mx-auto flex flex-row items-center justify-between gap-3">

            <!-- Left: Logo -->
            <div class="flex gap-2 items-center">
                <img src="/logo.svg" alt="" class="h-8 w-8 object-contain">
                <p class="hidden  md:block md:text-xl text-white font-semibold">
                    CloudScanner
                </p>
            </div>

            <!-- Right: Actions -->
            <div class="flex flex-nowrap justify-end items-center gap-2 sm:gap-4 w-full ">

                <button class="text-sm nav-link text-white">
                    Help
                </button>

                <button
                    class="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                    <span class="text-white/60">🌐</span>
                    <span class="hidden xs:inline">India · English (UK)</span>
                    <span class="xs:hidden">EN</span>
                </button>

                <button
                    class="bg-white rounded-lg font-semibold px-3 py-2 text-sm hover:bg-white/80 transition-all duration-150">
                    Log in
                </button>

            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.nav-link {
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.2s ease;
}

.nav-link:hover::after {
    width: 100%;
}
</style>