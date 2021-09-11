const state = {
    loading: false,

}

const mutations = {
    load: (state, loadState) => {
        state.loading = loadState
    },
}

const actions = {
    startLoading({commit}) {
        commit('load', true)
    },
    stopLoading({commit}) {
        commit('load', false)
    },

}

export default {
    state, mutations, actions
}