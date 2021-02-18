import InventoryDataService from "@/services/InventoryDataService";
import {FETCH_LOCATIONS} from "@/store/actions.type";
import {SET_LOCATIONS} from "@/store/mutations.type";

export const state = {
    locations: []
}

export const actions = {
    [FETCH_LOCATIONS] ({ commit }) {
        return InventoryDataService.getAll()
            .then(({ data }) => {
                commit(SET_LOCATIONS, data)
            })
            .catch((error) => {
                //TODO: popup handling
                throw new Error(error)
            })
    },
}

export const mutations = {
    [SET_LOCATIONS] (currentState, locations) {
        currentState.locations = locations
    }
}

export default {
    state,
    actions,
    mutations
}