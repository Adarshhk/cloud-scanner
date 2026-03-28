<template>
    <footer class="footer">
        <div class="footer-grid">

            <!-- Col 1: Locale Selector -->
            <div class="footer-col">
                <button class="locale-btn">
                    <span class="locale-globe">🌐</span>
                    India · English (UK)
                </button>
            </div>

            <!-- Col 2: Account & Support -->
            <div class="footer-col">
                <a href="#" class="footer-link">Help</a>
                <a href="#" class="footer-link">Privacy Settings</a>
                <a href="#" class="footer-link">Log in</a>
            </div>

            <!-- Col 3: Legal -->
            <div class="footer-col">
                <a href="#" class="footer-link">Cookie policy</a>
                <a href="#" class="footer-link">Privacy policy</a>
                <a href="#" class="footer-link">Terms of service</a>
                <a href="#" class="footer-link">Company Details</a>
            </div>

        </div>

        <!-- Divider -->
        <div class="footer-bottom">
            <p class="footer-copy">Cheap flight booking from anywhere, to everywhere</p>
            <p class="footer-copy">© Cloudscanner Ltd 2026 – 2026</p>
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
    background-color: var(--color-primary-color);
    color: #fff;
    padding: 2.5rem 2rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.footer-col {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* Locale button */
.locale-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    cursor: pointer;
    transition: all 0.2s;
    width: fit-content;
}

.locale-btn:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: #fff;
}

.locale-globe {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
}

/* Footer links */
.footer-link {
    position: relative;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.2s;
    width: fit-content;
}

.footer-link:hover {
    color: #fff;
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

/* Bottom */
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    text-align: center;
}

.footer-copy {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.25rem;
}
</style>