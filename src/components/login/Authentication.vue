<template>
  <div>
    Login Page
    <div>
      <ul>
        <li v-for="i in getMaleChar" :key="i.id">
          {{i.name}}
        </li>
      </ul>
      <div>
        <h4>Count: {{count}}</h4>
        <button class="btn btn-primary" v-on:click="increment(4)">Add</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  computed: {
    getMaleChar() {
      return this.$store.getters.maleChars;
    },
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment(payload) {
      //this.$store.commit("increment");
      this.$store.dispatch('increment', payload);
    }
  },
  mounted() {}
}
</script>