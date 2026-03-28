<template>
    <div>
        <Navbar />
        <router-view />
        <FAQ />
        <Footer />
    </div>
</template>

<script setup>
import FAQ from '@/components/FAQ.vue';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';


</script>

<style lang="scss" scoped></style>