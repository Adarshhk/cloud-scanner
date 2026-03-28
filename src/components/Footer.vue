<template>
    <footer class="bg-primary-color text-white px-8 py-10 ">
        <!-- Google Font Import via style tag workaround -->
        <div class="footer-grid grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

            <!-- Col 1: Locale Selector -->
            <div class="flex flex-col gap-4">
                <button
                    class="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white/80 hover:border-white/50 hover:text-white transition-all duration-200 w-fit">
                    <span class="text-white/60 text-xs">🌐</span>
                    India · English (UK)
                </button>
            </div>

            <!-- Col 2: Account & Support -->
            <div class="flex flex-col gap-3">
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Help</a>
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Privacy
                    Settings</a>
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Log
                    in</a>
            </div>

            <!-- Col 3: Legal -->
            <div class="flex flex-col gap-3">
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Cookie
                    policy</a>
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Privacy
                    policy</a>
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Terms
                    of service</a>
                <a href="#"
                    class="footer-link text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit">Company
                    Details</a>
            </div>


        </div>

        <!-- Divider -->
        <div class="border-t border-white/10 pt-6 text-center">
            <p class="text-xs text-white/40 mb-1">Cheap flight booking from anywhere, to everywhere</p>
            <p class="text-xs text-white/40">© Cloudscanner Ltd 2026 – 2026</p>
        </div>
    </footer>
</template>

<script setup>


</script>

<style scoped>
.footer-link {
    position: relative;
}

.footer-link::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.2s ease;
}

.footer-link:hover::after {
    width: 100%;
}
</style>