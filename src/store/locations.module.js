import LocationDataService from "@/services/LocationDataService";
import {CREATE_LOCATION, FETCH_LOCATIONS} from "@/store/actions.type";
import {SET_LOCATIONS} from "@/store/mutations.type";

export const state = {
    locations: []
}

export const actions = {
    [FETCH_LOCATIONS] ({ commit }) {
        return LocationDataService.getAll()
            .then(({ data }) => {
                commit(SET_LOCATIONS, data)
            })
            .catch((error) => {
                //TODO: popup handling
                throw new Error(error)
            })
    },
    [CREATE_LOCATION] (context, payload) {
        return LocationDataService.createLocation(payload)
            .then(() => {context.dispatch(FETCH_LOCATIONS)})
    }
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