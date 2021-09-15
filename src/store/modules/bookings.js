import { getAllBookings } from "../api";
import * as reponseConverterService from '../../services/response-converter.service'

const state = {
    allBookings: Array(),
}

const mutations = {
    setAllBookings: (state, bookings) => {
        state.allBookings = []
        bookings.forEach(booking => {
            state.allBookings.push(reponseConverterService.convertToBooking(booking))
        })
    },
}

const actions = {
    async fetchAllBookings({ commit }) {
        const bookings = await getAllBookings()
        commit('setAllBookings', bookings);
    }
}

export default {
    state,
    mutations,
    actions
}