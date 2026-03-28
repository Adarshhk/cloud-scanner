<template>
    <section class="faq-section bg-white px-6 py-12 max-w-3xl mx-auto ">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 leading-snug">
            Finding flight deals: frequently asked questions
        </h2>

        <div class="faq-list divide-y divide-gray-200">
            <div v-for="(item, index) in faqs" :key="index" class="faq-item py-5 cursor-pointer group"
                @click="toggle(index)">
                <div class="flex items-center justify-between gap-4">
                    <span
                        class="text-sm font-semibold text-gray-900 group-hover:text-primary-blue transition-colors duration-200">
                        {{ item.question }}
                    </span>
                    <svg class="w-4 h-4 shrink-0 text-primary-grey transition-transform duration-300"
                        :class="{ 'rotate-180': openIndex === index }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <!-- Answer panel -->
                <div class="overflow-hidden transition-all duration-300 ease-in-out"
                    :class="openIndex === index ? 'max-h-96 mt-3' : 'max-h-0'">
                    <p class="text-sm text-primary-grey leading-relaxed">
                        {{ item.answer }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

function toggle(index) {
    openIndex.value = openIndex.value === index ? null : index
}

const faqs = ref([
    {
        question: 'How can I find the best last minute flight deals?',
        answer:
            'The best way to find last-minute flight deals is to be flexible with your destination and travel dates. Use Cloudscanner\'s "Everywhere" search to discover the cheapest places to fly from your nearest airport. Signing up for price alerts also means you\'ll be notified the moment fares drop.',
    },
    {
        question: 'How can I stay updated on flight deals and low fares?',
        answer:
            'Set up price alerts on Cloudscanner for your favourite routes and we\'ll email you when prices change. You can also follow us on social media or check the Cloudscanner app daily — we surface deals as soon as airlines publish them.',
    },
    {
        question: "What happens after I've booked my flight?",
        answer:
            "Once you've completed your booking, you'll receive a confirmation email with your itinerary and e-ticket from the airline or travel agent. Make sure to check your spam folder if it doesn't arrive within a few minutes. You can also manage your booking directly on the airline's website.",
    },
    {
        question: 'Where should I book a flight to right now?',
        answer:
            "If you're looking for inspiration, use our Explore map to browse hundreds of destinations sorted by price. Popular choices right now include destinations across Southeast Asia, Southern Europe, and the UAE — all with competitive fares available this season.",
    },
])
</script>

<style scoped>
.faq-item {
    transition: background 0.15s ease;
    border-radius: 4px;
}
</style>