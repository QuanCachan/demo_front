import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        count: 0,
        chars: [
            {id: 1, name: 'Harry', sex: 'male'},
            {id: 2, name: 'Ron', sex: 'male'},
            {id: 3, name: 'Hermione', sex: 'female'},
        ]
    },
    getters: {
        maleChars: state => state.chars.filter(char => char.sex === 'male')
    },
    mutations: {
        increment(state, payload){
            state.count+= payload;
        }
    },
    actions: {
        increment:(context, payload) => {
            setTimeout(()=> {
                context.commit("increment", payload)
            }, 3000);
        }
    }
})