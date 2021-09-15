import { getAllQueries } from "../api";
import * as reponseConverterService from '../../services/response-converter.service'

const state = {
    allQueries: Array(),
}

const mutations = {
    setAllQueries: (state, queries) => {
        state.allQueries = []
        queries.forEach(query => {
            state.allQueries.push(reponseConverterService.convertToQuery(query))
        })
    },
}

const actions = {
    async fetchAllQueries({ commit }) {
        const queries = await getAllQueries()
        commit('setAllQueries', queries);
    }
}

export default {
    state,
    mutations,
    actions
}