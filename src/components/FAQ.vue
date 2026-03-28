<template>
    <section class="faq-section">
        <h2 class="faq-title">
            Finding flight deals: frequently asked questions
        </h2>

        <div class="faq-list">
            <div v-for="(item, index) in faqs" :key="index" class="faq-item" @click="toggle(index)">
                <div class="faq-row">
                    <span class="faq-question" :class="{ 'faq-question--open': openIndex === index }">
                        {{ item.question }}
                    </span>
                    <svg class="faq-chevron" :class="{ 'faq-chevron--open': openIndex === index }" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <!-- Answer panel -->
                <div class="faq-answer" :class="{ 'faq-answer--open': openIndex === index }">
                    <p class="faq-answer-text">{{ item.answer }}</p>
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
.faq-section {
    background-color: #fff;
    padding: 3rem 1.5rem;
    max-width: 48rem;
    margin: 0 auto;
}

.faq-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 2rem;
    line-height: 1.35;
}

.faq-list {
    /* Dividers via border-top on children */
}

.faq-item {
    padding: 1.25rem 0;
    cursor: pointer;
    border-top: 1px solid #e5e7eb;
    border-radius: 4px;
    transition: background 0.15s ease;
}

.faq-item:last-child {
    border-bottom: 1px solid #e5e7eb;
}

.faq-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.faq-question {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
    transition: color 0.2s;
}

.faq-question--open,
.faq-item:hover .faq-question {
    color: var(--color-primary-blue);
}

.faq-chevron {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--color-primary-grey);
    transition: transform 0.3s;
}

.faq-chevron--open {
    transform: rotate(180deg);
}

/* Answer panel — max-height transition for accordion */
.faq-answer {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
}

.faq-answer--open {
    max-height: 24rem;
    margin-top: 0.75rem;
}

.faq-answer-text {
    font-size: 0.875rem;
    color: var(--color-primary-grey);
    line-height: 1.625;
}
</style>