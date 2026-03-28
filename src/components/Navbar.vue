<template>
    <div class="navbar">
        <div class="navbar-inner">

            <!-- Left: Logo -->
            <div class="navbar-logo">
                <img src="/logo.svg" alt="" class="logo-img" />
                <p class="logo-text">CloudScanner</p>
            </div>

            <!-- Right: Actions -->
            <div class="navbar-actions">
                <button class="nav-link">Help</button>

                <button class="locale-btn">
                    <span class="locale-globe">🌐</span>
                    <span class="locale-full">India · English (UK)</span>
                    <span class="locale-short">EN</span>
                </button>

                <button class="login-btn">Log in</button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.navbar {
    width: 100%;
    background-color: var(--color-primary-color);
    padding: 0.75rem 1rem;
    overflow: hidden;
}

.navbar-inner {
    max-width: 80rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-width: 0;
}

/* Logo */
.navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
}

.logo-img {
    height: 2rem;
    width: 2rem;
    object-fit: contain;
}

.logo-text {
    display: none;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
}

@media (min-width: 768px) {
    .logo-text {
        display: block;
    }
}

/* Actions */
.navbar-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    flex-shrink: 1;
}

@media (min-width: 640px) {
    .navbar-actions {
        gap: 1rem;
    }
}

/* Help link */
.nav-link {
    font-size: 0.875rem;
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 0;
    white-space: nowrap;
    flex-shrink: 0;
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

/* Locale */
.locale-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

@media (min-width: 640px) {
    .locale-btn {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
}

.locale-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.locale-globe {
    color: rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
}

.locale-full {
    display: none;
}

.locale-short {
    display: inline;
}

@media (min-width: 480px) {
    .locale-full {
        display: inline;
    }

    .locale-short {
        display: none;
    }
}

/* Login */
.login-btn {
    background-color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
}

.login-btn:hover {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>