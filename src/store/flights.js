import axios from "axios";
import { defineStore } from "pinia"
import { ref, resolveDirective } from "vue"

export const useFlightStore = defineStore('flight', () => {

    const flights = ref([]);
    const selectedStates = ref({
        source: '',
        destination: ''
    })
    const states = ref([]);

    const getFlights = async () => {
        try {
            const res = await axios.get('/json/flights.json')
            if (res.data) {
                flights.value = res.data

                const set = new Set()

                flights.value.forEach(flight => {
                    flight.segment.forEach(seg => {
                        set.add(seg.origin)
                        set.add(seg.destination)
                    })
                })

                states.value = Array.from(set)

            }

        } catch (error) {
            console.log('error while fetching flight details', error);
        }
    }



    getFlights()

    return {
        flights,
        states,
        selectedStates,
        getFlights
    }
})